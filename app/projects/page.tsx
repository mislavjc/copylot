import { ProjectForm } from '@/components/@project/project-form';
import { ProjectsTable } from '@/components/@project/projects-table';
import { Separator } from '@/components/ui/separator';

const ProjectsPage = () => {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="mt-8 mb-4 text-2xl font-bold">Your projects</h2>
      {/* @ts-expect-error server component */}
      <ProjectsTable />
      <Separator />
      <h2 className="mt-8 mb-4 text-2xl font-bold">Create a new project</h2>
      <ProjectForm />
    </div>
  );
};

export default ProjectsPage;
