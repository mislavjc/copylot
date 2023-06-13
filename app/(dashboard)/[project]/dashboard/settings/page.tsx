import { ProjectForm } from '@/components/@project/project-form';
import { CodeBlock } from '@/components/code-block';
import { getProjectByUrl } from '@/lib/api/projects';
import { AppParams } from '@/types/indext';

export const metadata = {
  title: 'Settings',
  description: 'Manage your settings',
};

const code = `<script defer src="${
  process.env.NEXTAUTH_URL || process.env.VERCEL_URL
}/script.js"></script>`;

interface SettingsPageProps extends AppParams {}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const project = await getProjectByUrl(params.project);

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <ProjectForm project={project!} />
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Installation</h2>
        <p className="mb-4">
          Add the following script to your website to start using Copylot.
        </p>
        <CodeBlock code={code} />
      </div>
    </div>
  );
};

export default SettingsPage;
