'use client';

import { useEffect, useState } from 'react';
import {
  Prisma,
  PromptLibrary,
  ToneDescription,
  Variation,
} from '@prisma/client/edge';
import { useCompletion } from 'ai/react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from 'ui/button';
import { Input } from 'ui/input';
import { Textarea } from 'ui/textarea';
import { ToastAction } from 'ui/toast';
import { toast } from 'ui/use-toast';

import {
  PromptLibraryType,
  PromptSelect,
} from 'components/@prompt-libraty/prompt-select';
import { Icons } from 'components/icons';

import { createVariation } from 'lib/api/actions';
import { createSystemPrompt } from 'lib/tone';

interface VariationPlaygroundProps {
  experimentId: string;
  promptLibrary: PromptLibrary[];
  toneDescription: ToneDescription | null;
}

type VariationType = Variation | Prisma.VariationCreateWithoutExperimentInput;

export const VariationPlayground = ({
  experimentId,
  promptLibrary,
  toneDescription,
}: VariationPlaygroundProps) => {
  const { project } = useParams();
  const router = useRouter();

  const {
    completion,
    handleSubmit,
    handleInputChange,
    setInput,
    setCompletion,
  } = useCompletion({
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
    onFinish: () => {
      if (!toneDescription)
        toast({
          title: 'Tip',
          description: 'Add tone to improve quality of generated content!',
          action: (
            <ToastAction
              altText="Goto setttings"
              onClick={() => router.push(`/${project}/dashboard/settings`)}
            >
              Add tone
            </ToastAction>
          ),
        });
    },
    body: {
      systemPrompt: toneDescription && createSystemPrompt(toneDescription),
    },
  });

  const [selected, setSelected] = useState<VariationType>({
    name: '',
    value: '',
  });
  const [selectedPrompt, setSelectedPrompt] = useState<PromptLibraryType>({
    name: '',
    value: '',
  });
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (selectedPrompt.value) {
      setPrompt(selectedPrompt.value);
      setInput(selectedPrompt.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrompt]);

  const variationContext = `Take text "${completion}" and rewrite it as a new variation while keeping prompt: ${prompt} in mind.`;

  return (
    <div>
      <div className="mt-4 flex-col gap-4">
        <div>
          <form onSubmit={handleSubmit} className="my-4 flex gap-4">
            <Input
              value={prompt}
              onChange={(e) => {
                handleInputChange(e);
                setPrompt(e.target.value);
              }}
              placeholder="Write a prompt, you can also pick it from prompt library."
            />
            <PromptSelect
              selected={selectedPrompt}
              setSelected={setSelectedPrompt}
              promptLibrary={promptLibrary}
            />
            <Button>Generate</Button>
          </form>
        </div>
        <Input
          value={selected.name}
          onChange={(e) =>
            setSelected({
              ...selected,
              name: e.target.value,
            })
          }
          placeholder="Write a name for the variation."
          className="my-4"
        />
        <Textarea
          value={completion}
          onChange={(e) => {
            setCompletion(e.target.value);
          }}
          placeholder="The variation content will be displayed here, you can always edit it."
          className="my-4 h-96 min-h-fit"
        />
        <div className="flex justify-between">
          <form
            onSubmit={(e) => {
              setInput(variationContext);
              handleSubmit(e);
            }}
          >
            <Button variant="secondary" disabled={!completion}>
              <Icons.shuffle className="mr-2" />
              Remix prompt
            </Button>
          </form>
          <Button
            onClick={() =>
              createVariation(experimentId, {
                name: selected.name,
                value: completion,
              })
            }
          >
            Save variation
          </Button>
        </div>
      </div>
    </div>
  );
};
