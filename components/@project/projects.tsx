import Avatar from 'boring-avatars';
import Link from 'next/link';

import { Card, CardContent, CardFooter } from 'ui/card';

import { Icons } from 'components/icons';

import { getProjects } from 'lib/api/projects';

export const Projects = async () => {
  const projects = await getProjects();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <Link href={`/${project.url}/dashboard`} key={project.id}>
            <Card key={project.id} className="min-w-[20rem] px-1 pt-6">
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar size={40} name={project.id} variant="marble" />
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold">{project.name}</h3>
                    <p className="from-neutral-600 text-sm">{project.url}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-4 flex items-center">
                <Icons.experiments className="mr-1 inline-block h-3 w-3 from-neutral-600" />
                <span className="from-neutral-600 text-sm">
                  {project._count.experiments}{' '}
                  {project._count.experiments === 1
                    ? 'experiment'
                    : 'experiments'}
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      {projects.length === 0 && (
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <Icons.serverOff className="h-32 w-32" />
          <h2 className="mt-4 text-xl font-semibold text-neutral-900">
            No projects yet
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Create your first project to get started
          </p>
        </div>
      )}
    </div>
  );
};
