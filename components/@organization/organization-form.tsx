'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from 'ui/button';
import { Input } from 'ui/input';
import { Label } from 'ui/label';

import { organizationFormCreateSchema } from 'lib/validations/organization';

type FormData = z.infer<typeof organizationFormCreateSchema>;

export const OrganizationForm = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(organizationFormCreateSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const { name } = data;

    const response = await fetch('/api/organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const { id } = await response.json();

    router.push(`/${id}`);
  };

  return (
    <div className="rounded border p-5">
      <form className="flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1.5 grid w-full items-center gap-1.5">
          <Label htmlFor="name">Organization name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Acme Inc."
            {...register('name')}
          />
          <p className="text-sm text-muted-foreground">
            You can change this later.
          </p>
        </div>
        <Button type="submit">Create organization</Button>
      </form>
    </div>
  );
};
