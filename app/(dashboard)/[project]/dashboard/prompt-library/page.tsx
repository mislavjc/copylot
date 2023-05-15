import { Playground } from '@/components/@prompt-libraty/playground';
import { getProjectByUrl } from '@/lib/api/projects';
import { getPromptLibraty } from '@/lib/api/prompt-library';

interface PromptLibraryProps {
  params: {
    project: string;
  };
}

export const metadata = {
  title: 'Prompt library',
  description: 'Manage your prompt library',
}

const PromptLibrary = async ({ params }: PromptLibraryProps) => {
  const promptLibrary = await getPromptLibraty(params.project);
  const project = await getProjectByUrl(params.project);

  return (
    <div>
      <Playground promptLibrary={promptLibrary} project={project!} />
    </div>
  );
};

export default PromptLibrary;
