'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '@prisma/client/edge';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateProject } from '@/lib/api/actions';
import { projectFormCreateSchema } from '@/lib/validations/project';

type FormData = z.infer<typeof projectFormCreateSchema>;

interface ProjectFormProps {
  project?: Project;
}

export const ProjectForm = ({ project }: ProjectFormProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(projectFormCreateSchema),
    defaultValues: {
      name: project?.name,
      url: project?.url,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const { name, url } = data;

    if (project) {
      await updateProject(project.id, {
        name,
        url,
      });
      return;
    }

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, url }),
    });

    const { url: projecturl } = await response.json();

    router.push(`/${projecturl}/dashboard`);
  };

  return (
    <div>
      <form className="flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-3">
          <Label htmlFor="name">Project name</Label>
          <Input
            type="text"
            id="name"
            placeholder="New Project"
            {...register('name')}
          />
          <p className="text-sm text-muted-foreground">
            You can change this later.
          </p>
        </div>
        <div className="grid w-full items-center gap-1.5 mb-3">
          <Label htmlFor="url">Website URL</Label>
          <Input
            type="text"
            id="url"
            placeholder="New Project"
            {...register('url')}
          />
          <p className="text-sm text-muted-foreground">
            The URL of the website you want to track.
          </p>
        </div>
        <Button type="submit">
          {project ? 'Update project' : 'Create project'}
        </Button>
      </form>
    </div>
  );
};
