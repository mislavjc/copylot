import { ProjectForm } from '@/components/@project/project-form';
import { getProjectByUrl } from '@/lib/api/projects';
import { AppParams } from '@/types/indext';

export const metadata = {
  title: 'Settings',
  description: 'Manage your settings',
};

interface SettingsPageProps extends AppParams {}

const SettingsPage = async ({ params }: SettingsPageProps) => {
  const project = await getProjectByUrl(params.project);

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <ProjectForm project={project!} />
    </div>
  );
};

export default SettingsPage;
