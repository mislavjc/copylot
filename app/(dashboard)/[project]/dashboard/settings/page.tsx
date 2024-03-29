import { Card, CardContent, CardHeader, CardTitle } from 'ui/card';

import { ProjectForm } from 'components/@project/project-form';
import { ToneForm } from 'components/@tone/tone-form';
import { CodeBlock } from 'components/code-block';

import { getProjectByUrl } from 'lib/api/projects';
import { getToneByProjectId } from 'lib/api/tone';

import { AppParams } from 'types';

export const metadata = {
  title: 'Copylot | Settings',
  description: 'Manage your settings',
};

const code = `<script defer src="${
  process.env.NEXTAUTH_URL || process.env.VERCEL_URL
}/script.js"></script>`;

interface SettingsPageProps extends AppParams {}

export const dynamic = 'force-dynamic';

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const project = await getProjectByUrl(params.project);
  const toneDescription = await getToneByProjectId(project!.id);

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Tone settings</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ToneForm projectId={project!.id} toneDescription={toneDescription} />
        </CardContent>
      </Card>

      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Project settings</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectForm project={project!} />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Installation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Add the following script to your website to start using Copylot.
            </p>
            <CodeBlock code={code} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
