'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { projectFormCreateSchema } from '@/lib/validations/project';

type FormData = z.infer<typeof projectFormCreateSchema>;

export const ProjectForm = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(projectFormCreateSchema),
  });

  const router = useRouter();
  const { organization } = useParams();

  const onSubmit = async (data: FormData) => {
    const { name, url } = data;

    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, url, organizationId: organization }),
    });

    const { id } = await response.json();

    router.push(`/${organization}/${id}`);
  };

  return (
    <div className="p-5 border rounded">
      <form className="flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-1.5">
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
        <div className="grid w-full items-center gap-1.5 mb-1.5">
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
        <Button type="submit">Create project</Button>
      </form>
    </div>
  );
};
