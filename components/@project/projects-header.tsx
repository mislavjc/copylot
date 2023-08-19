import { Button } from 'ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui/dialog';

import { ProjectForm } from './project-form';

export const ProjectsHeader = () => {
  return (
    <div className="bg-white p-8">
      <div className="mx-auto flex max-w-screen-lg items-center justify-between">
        <h2 className="max-w-screen-lg text-2xl text-neutral-500">
          Your projects
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new project</DialogTitle>
              <DialogDescription>
                Projects are where you manage your experiments.
              </DialogDescription>
            </DialogHeader>
            <ProjectForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
