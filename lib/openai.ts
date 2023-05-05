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

export const createStreamingResponse = async (
  prompt: string,
  setResponse: (value: SetStateAction<string>) => void
) => {
  const response = await fetch('/api/chat-streaming', {
    method: 'POST',
    body: JSON.stringify({
      prompt,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  function onParse(event: ParseEvent) {
    if (event.type === 'event') {
      try {
        const data = JSON.parse(event.data) as Data;
        data.choices
          .filter(({ delta }) => !!delta.content)
          .forEach(({ delta }) => {
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
    if (done || dataString.includes('[DONE]')) break;
    parser.feed(dataString);
  }
};
