import { Separator } from 'ui/separator';

import { ProjectForm } from 'components/@project/project-form';
import { ProjectsTable } from 'components/@project/projects-table';

export const metadata = {
  title: 'Projects',
  description: 'Manage your projects',
};

const ProjectsPage = () => {
  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-4 mt-8 text-2xl font-bold">Your projects</h2>
      <ProjectsTable />
      <Separator />
      <h2 className="mb-4 mt-8 text-2xl font-bold">Create a new project</h2>
      <ProjectForm />
    </div>
  );
};

export default ProjectsPage;
