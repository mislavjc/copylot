import { navbarConfig } from 'config/navbar';

import { Navbar } from 'components/@navbar/navbar';

const ProjectsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar config={navbarConfig.projectsNav} />
      {children}
    </div>
  );
};

export default ProjectsLayout;
