import { ParseEvent, createParser } from 'eventsource-parser';
import { SetStateAction } from 'react';

interface Delta {
  insert: string;
  content: string;
  attributes?: { [key: string]: any };
}

interface Choice {
  text: string;
  index: number;
  logprobs: { [key: string]: number };
  finish_reason: string;
  delta: Delta;
}

interface Data {
  id: string;
  object: string;
  model: string;
  choices: Choice[];
}

export interface ChatStream {
  content: string;
  role: 'assistant' | 'user';
}

export const createStreamingResponse = async (
  prompt: string,
  setResponse: (value: SetStateAction<string>) => void,
  chatStream: ChatStream[]
) => {
  const res = await fetch('/api/chat/streaming', {
    method: 'POST',
    body: JSON.stringify({
      prompt,
      history: chatStream,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  const strings: string[] = [];

  function onParse(event: ParseEvent) {
    if (event.type === 'event') {
      try {
        const data = JSON.parse(event.data) as Data;
        data.choices
          .filter(({ delta }) => !!delta.content)
          .forEach(({ delta }) => {
            strings.push(delta.content);

            setResponse((prev) => {
              return `${prev || ''}${delta.content}`;
            });
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  const parser = createParser(onParse);

  while (true) {
    const { value, done } = await reader.read();
    const dataString = decoder.decode(value);
    if (done || dataString.includes('[DONE]')) {
      const mergedStrings = strings.join('');

      fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          chat: [
            {
              role: 'user',
              content: prompt,
            },
            {
              role: 'assistant',
              content: mergedStrings,
            },
          ],
        }),
      });

      break;
    }
    parser.feed(dataString);
  }
};
