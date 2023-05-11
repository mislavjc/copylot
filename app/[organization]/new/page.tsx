import { ProjectForm } from '@/components/project-form';

const NewProject = () => {
  return (
    <div className="max-w-2xl p-5 mx-auto mt-5 border rounded">
      <h1 className="text-xl font-semibold">Create a new project</h1>
      <p className="mt-2 text-sm text-gray-500">
        Projects allow you to group websites under a single umbrella. You can
        create multiple projects and invite your team members to them.
      </p>
      <div className="mt-5">
        <ProjectForm />
      </div>
    </div>
  );
};

export default NewProject;
