import { Card, CardContent } from 'ui/card';

import { ProjectForm } from 'components/@project/project-form';
import { CodeBlock } from 'components/code-block';

import { getProjectByUrl } from 'lib/api/projects';

import { AppParams } from 'types/indext';

export const metadata = {
  title: 'Copylot | Settings',
  description: 'Manage your settings',
};

const code = `<script defer src="${
  process.env.NEXTAUTH_URL || process.env.VERCEL_URL
}/script.js"></script>`;

interface SettingsPageProps extends AppParams {}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const project = await getProjectByUrl(params.project);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <Card>
        <CardContent className="pt-6">
          <ProjectForm project={project!} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-4">
          <h2 className="mb-4 text-xl font-bold">Installation</h2>
          <p className="mb-4">
            Add the following script to your website to start using Copylot.
          </p>
          <div className="overflow-auto">
            <CodeBlock code={code} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
