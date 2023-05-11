'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { organizationFormCreateSchema } from '@/lib/validations/organization';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
    <div className="p-5 border rounded">
      <form className="flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5 mb-1.5">
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
