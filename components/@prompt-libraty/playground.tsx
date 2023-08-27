'use client';

import { useState } from 'react';
import { Project, PromptLibrary } from '@prisma/client/edge';

import { Button } from 'ui/button';
import { Textarea } from 'ui/textarea';

import { addPromptToLibrary, updatePromptInLibrary } from 'lib/api/actions';

import { Input } from '../ui/input';

import { PromptLibraryType, PromptSelect } from './prompt-select';

interface PlaygroundProps {
  promptLibrary: PromptLibrary[];
  project: Project;
}

export const Playground = ({ promptLibrary, project }: PlaygroundProps) => {
  const [selected, setSelected] = useState<PromptLibraryType>({
    name: '',
    value: '',
  });

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <PromptSelect
            selected={selected}
            setSelected={setSelected}
            promptLibrary={promptLibrary}
          />
        </div>
      </div>
      <div className="mt-4 flex-col gap-4">
        <Input
          value={selected.name}
          onChange={(e) =>
            setSelected({
              ...selected,
              name: e.target.value,
            })
          }
          placeholder="Write a name for your prompt. This will be displayed in the prompt library."
          className="my-4"
        />
        <Textarea
          value={selected.value}
          onChange={(e) => {
            setSelected({
              ...selected,
              value: e.target.value,
            });
          }}
          placeholder="Write your prompt here. You can use markdown to format your prompt."
          className="my-4 h-96 min-h-fit"
        />
      </div>
      <div className="flex justify-between gap-2">
        <Button
          onClick={() => {
            if (selected.name && selected.value) {
              if (selected?.id) {
                updatePromptInLibrary(selected.id, {
                  name: selected.name,
                  value: selected.value,
                });
              } else {
                addPromptToLibrary(project.id, {
                  name: selected.name,
                  value: selected.value,
                });
              }
            }
          }}
        >
          Save prompt
        </Button>
        <Button
          onClick={() => {
            setSelected({
              name: '',
              value: '',
            });
          }}
          variant="secondary"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
