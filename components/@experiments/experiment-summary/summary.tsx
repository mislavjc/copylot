'use client';

import { useChat } from 'ai/react';
import { CornerDownLeft } from 'lucide-react';

import { Button } from 'ui/button';
import { Textarea } from 'ui/textarea';

import { Icons } from 'components/icons';
import { Separator } from 'components/ui/separator';

import { ProcessedData } from 'lib/charts';

interface SummaryProps {
  stats: ProcessedData[];
}

export const Summary = ({ stats }: SummaryProps) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      systemPrompt: `
        Please analyze the following dataset, which contains information about various experiments. Each entry in the dataset has the following attributes:

        - **name**: The name of the experiment variation.
        - **value**: A value associated with the experiment variation.
        - **experiment_click**: The number of clicks recorded for the experiment.
        - **experiment_view**: The number of views recorded for the experiment.
        - **click_through_rate**: The calculated click-through rate for the experiment.

        Based on this data, answer any relevant questions.

        DATA
        ${JSON.stringify(stats)}
        END DATA
      `,
    },
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
            <div className="w-full">
              <p className="text-gray-700">{m.content}</p>
              <Separator className="mt-8" />
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-screen-md"
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
