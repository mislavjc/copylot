'use client';

import { Prisma, PromptLibrary, Variation } from '@prisma/client/edge';
import { useCompletion } from 'ai/react';
import { useEffect, useState } from 'react';

import {
  PromptLibraryType,
  PromptSelect,
} from '@/components/@prompt-libraty/prompt-select';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createVariation } from '@/lib/api/actions';

interface VariationPlaygroundProps {
  experimentId: string;
  promptLibrary: PromptLibrary[];
}

type VariationType = Variation | Prisma.VariationCreateWithoutExperimentInput;

export const VariationPlayground = ({
  experimentId,
  promptLibrary,
}: VariationPlaygroundProps) => {
  const {
    completion,
    handleSubmit,
    handleInputChange,
    setInput,
    setCompletion,
  } = useCompletion();

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
      <h1 className="mt-4 text-2xl">Variation Playground</h1>
      <div className="flex-col gap-4 mt-4">
        <div>
          <form onSubmit={handleSubmit} className="flex gap-4 my-4">
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
