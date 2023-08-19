import { Prisma, PromptLibrary } from '@prisma/client/edge';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'ui/select';

export type PromptLibraryType =
  | PromptLibrary
  | Prisma.PromptLibraryCreateWithoutProjectInput;

interface PromptSelectProps {
  selected: PromptLibraryType;
  setSelected: React.Dispatch<React.SetStateAction<PromptLibraryType>>;
  promptLibrary: PromptLibrary[];
}

export const PromptSelect = ({
  selected,
  setSelected,
  promptLibrary,
}: PromptSelectProps) => {
  return (
    <Select
      value={selected?.id}
      onValueChange={(value) => {
        const prompt = promptLibrary.find((prompt) => prompt.id === value)!;
        setSelected(prompt);
      }}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a prompt" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Prompts</SelectLabel>
          {promptLibrary.map((library) => (
            <SelectItem key={library.id} value={library.id}>
              {library.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
