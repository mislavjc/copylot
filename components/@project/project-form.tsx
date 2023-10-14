'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Project } from '@prisma/client/edge';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from 'ui/button';
import { Input } from 'ui/input';
import { toast } from 'ui/use-toast';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';

import { createProject, updateProject } from 'lib/api/actions/projects';
import { projectFormCreateSchema } from 'lib/validations/project';

type FormData = z.infer<typeof projectFormCreateSchema>;

interface ProjectFormProps {
  project?: Project;
}

export const ProjectForm = ({ project }: ProjectFormProps) => {
  const form = useForm<FormData>({
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

      toast({
        description: 'Project updated successfully.',
      });

      return;
    }

    const { url: projectUrl } = await createProject({ name, url });

    router.push(`/${projectUrl}/dashboard`);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="New Project" {...field} />
                </FormControl>
                <FormDescription>You can change this later.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="www.example.com" {...field} />
                </FormControl>
                <FormDescription>
                  The URL of the website you want to track.
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.url && (
                    <span className="text-red-500">
                      {form.formState.errors.url.message}
                    </span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
