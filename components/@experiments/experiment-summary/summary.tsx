'use client';

import { Message } from '@prisma/client/edge';
import { useChat } from 'ai/react';
import { CornerDownLeft } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { Button } from 'ui/button';
import { Textarea } from 'ui/textarea';

import { CodeBlock } from 'components/code-block';
import { Icons } from 'components/icons';
import { MemoizedReactMarkdown } from 'components/markdown';
import { Separator } from 'components/ui/separator';

import { ProcessedData } from 'lib/charts';

interface SummaryProps {
  stats: ProcessedData[];
  experimentId: string;
  initialMessages: Message[];
}

export const Summary = ({
  stats,
  experimentId,
  initialMessages,
}: SummaryProps) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      experimentId,
      systemPrompt: `
        Please analyze the following dataset...
        DATA
        ${JSON.stringify(stats)}
        END DATA
      `,
    },
    initialMessages,
  });

  return (
    <div>
      <div className="mb-20 flex flex-col gap-8">
        {messages.map((m) => (
          <div key={m.id} className="flex gap-4">
            <div>
              {m.role === 'user' ? (
                <Icons.user className="h-7 w-7 rounded bg-orange-600 p-1 text-gray-50" />
              ) : (
                <Icons.bot className="h-7 w-7 rounded bg-blue-600 p-1 text-gray-50" />
              )}
            </div>
            <div className="w-full overflow-x-auto sm:w-auto">
              <MemoizedReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                components={{
                  p({ children }) {
                    return <p className="mb-2 last:mb-0">{children}</p>;
                  },
                  code({ node, inline, className, children, ...props }) {
                    if (children.length) {
                      if (children[0] == '▍') {
                        return (
                          <span className="mt-1 animate-pulse cursor-default">
                            ▍
                          </span>
                        );
                      }

                      children[0] = (children[0] as string).replace('`▍`', '▍');
                    }

                    const match = /language-(\w+)/.exec(className || '');

                    if (inline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }

                    return (
                      <CodeBlock
                        key={Math.random()}
                        language={match?.[1] || ''}
                        code={children.toString()}
                        {...props}
                      />
                    );
                  },
                }}
              >
                {m.content}
              </MemoizedReactMarkdown>
              <Separator className="mt-8" />
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 w-screen max-w-screen-md md:left-auto"
      >
        <div className="relative rounded border bg-white p-4">
          <Textarea
            value={input}
            onChange={handleInputChange}
            className="min-h-[50px] w-full resize-none bg-transparent px-4 py-[1rem] pr-20 focus-within:outline-none sm:text-sm"
            placeholder="Type your question here..."
          />
          <Button type="submit" className="absolute right-4 top-6 mr-4 mt-2">
            <CornerDownLeft />
          </Button>
        </div>
      </form>
    </div>
  );
};
