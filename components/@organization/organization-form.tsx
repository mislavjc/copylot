'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Organization } from '@prisma/client/edge';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from 'ui/button';
import { Input } from 'ui/input';
import { Label } from 'ui/label';
import { toast } from 'ui/use-toast';

import {
  createOrganization,
  updateOrganization,
} from 'lib/api/actions/organizations';
import { organizationFormCreateSchema } from 'lib/validations/organization';

type FormData = z.infer<typeof organizationFormCreateSchema>;

interface OrganizationFormProps {
  organization: Organization | null;
}

export const OrganizationForm = ({ organization }: OrganizationFormProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(organizationFormCreateSchema),
    defaultValues: {
      name: organization?.name,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const { name } = data;

    if (organization) {
      await updateOrganization(organization.id, { name });

      toast({
        description: 'Organization successfully updated!',
      });

      return;
    }

    await createOrganization(name);

    router.push('/projects');
  };

  return (
    <div>
      <form className="flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 grid w-full items-center gap-2">
          <Label htmlFor="name">Organization name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Acme Inc."
            {...register('name')}
          />
        </div>
        <Button type="submit">
          {organization ? 'Update organization' : 'Create organization'}
        </Button>
      </form>
    </div>
  );
};
