import { Card, CardContent } from 'ui/card';

import { Playground } from 'components/@prompt-libraty/playground';

import { getProjectByUrl } from 'lib/api/projects';
import { getPromptLibraty } from 'lib/api/prompt-library';

import { AppParams } from 'types/indext';

export const metadata = {
  title: 'Copylot | Prompt library',
  description: 'Manage your prompt library',
};

interface PromptLibraryProps extends AppParams {}

const PromptLibrary = async ({ params }: PromptLibraryProps) => {
  const promptLibrary = await getPromptLibraty(params.project);
  const project = await getProjectByUrl(params.project);

  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <Playground promptLibrary={promptLibrary} project={project!} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptLibrary;
