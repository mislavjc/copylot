'use client';

import { FormEvent, useState } from 'react';
import Markdown from 'markdown-to-jsx';

import { Button } from './ui/button';
import { ChatStream, createStreamingResponse } from '@/lib/openai';
import { Textarea } from './ui/textarea';
import { Bot, User } from 'lucide-react';

interface ChatProps {
  history: ChatStream[];
}

export const Chat = ({ history }: ChatProps) => {
  const [content, setText] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatStream, setChatStream] = useState<ChatStream[]>(history);

  async function handleOnGenerateText(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setIsLoading(true);
    if (content) {
      setChatStream((prev) => [
        ...(prev || []),
        { content, role: 'assistant' },
      ]);
    }
    setChatStream((prev) => [
      ...(prev || []),
      { content: prompt, role: 'user' },
    ]);
    setText('');
    setPrompt('');

    await createStreamingResponse(prompt, setText, chatStream);

    setIsLoading(false);
  }

  return (
    <div className="flex justify-center w-screen p-4">
      <div className="w-full max-w-xl">
        <div className="mb-40">
          <div className="flex flex-col gap-4 mb-4">
            {chatStream?.map((chat, index) => (
              <div
                className="flex gap-4 p-4 border rounded-md w-100"
                key={index}
              >
                <div>{chat.role === 'assistant' ? <Bot /> : <User />}</div>
                <Markdown>{chat.content}</Markdown>
              </div>
            ))}
          </div>
          {content && (
            <div className="flex gap-4 p-4 border rounded-md w-100">
              <div>
                <Bot />
              </div>
              <div>{content}</div>
            </div>
          )}
        </div>
        <form
          className="fixed inset-x-0 w-full max-w-xl p-4 mx-auto bottom-4 sm:p-0"
          onSubmit={handleOnGenerateText}
        >
          <div className="grid w-full gap-2 bg-white">
            <Textarea
              placeholder="Type your message here."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button disabled={isLoading || !prompt}>Send message</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
