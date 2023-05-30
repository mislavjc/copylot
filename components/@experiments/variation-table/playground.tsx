'use client';

import { Prisma, PromptLibrary, Variation } from '@prisma/client/edge';
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
import { createStreamingResponse } from '@/lib/openai';

interface VariationPlaygroundProps {
  experimentId: string;
  promptLibrary: PromptLibrary[];
}

type VariationType = Variation | Prisma.VariationCreateWithoutExperimentInput;

export const VariationPlayground = ({
  experimentId,
  promptLibrary,
}: VariationPlaygroundProps) => {
  const [selected, setSelected] = useState<VariationType>({
    name: '',
    value: '',
  });
  const [selectedPrompt, setSelectedPrompt] = useState<PromptLibraryType>({
    name: '',
    value: '',
  });
  const [prompt, setPrompt] = useState(selectedPrompt.value);
  const [variation, setVariation] = useState('');

  useEffect(() => {
    if (selectedPrompt.value) {
      setPrompt(selectedPrompt.value);
    }
  }, [selectedPrompt]);

  const handleGenrateVariation = async () => {
    setVariation('');

    await createStreamingResponse(prompt, setVariation, []);
  };

  const remixVariation = async () => {
    const variationContext = `Take text from ${variation} and rewrite it as a new variation while keeping prompt: ${prompt} in mind.`;

    setVariation('');

    await createStreamingResponse(variationContext, setVariation, []);
  };

  return (
    <div>
      <h1 className="mt-4 text-2xl">Variation Playground</h1>
      <div className="flex-col gap-4 mt-4">
        <div className="flex gap-4 my-4">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Write a prompt, you can also pick it from prompt library."
          />
          <PromptSelect
            selected={selectedPrompt}
            setSelected={setSelectedPrompt}
            promptLibrary={promptLibrary}
          />
        </div>
        <Button onClick={handleGenrateVariation}>Generate</Button>
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
          value={variation}
          onChange={(e) => {
            setVariation(e.target.value);
          }}
          placeholder="The variation content will be displayed here, you can always edit it."
          className="my-4 h-96 min-h-fit"
        />
        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={remixVariation}
            disabled={!variation}
          >
            <Icons.shuffle className="mr-2" />
            Remix prompt
          </Button>
          <Button
            onClick={() =>
              createVariation(experimentId, {
                name: selected.name,
                value: variation,
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
