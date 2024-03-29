import { Projects } from 'components/@project/projects';
import { ProjectsHeader } from 'components/@project/projects-header';

export const metadata = {
  title: 'Copylot | Projects',
  description: 'Manage your projects',
};

export const dynamic = 'force-dynamic';

const ProjectsPage = () => {
  return (
    <div className="min-h-[calc(100vh-111px)] bg-slate-50">
      <ProjectsHeader />
      <div className="mx-auto mt-8 max-w-screen-lg p-4">
        <Projects />
      </div>
    </div>
  );
};

export default ProjectsPage;
