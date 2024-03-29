import { Card, CardContent } from 'ui/card';

import { Navbar } from 'components/@navbar/navbar';
import { OrganizationForm } from 'components/@organization/organization-form';

import { getCurrentUser } from 'lib/auth';

import prisma from 'db/prisma';

export const dynamic = 'force-dynamic';

const OrganizationPage = async () => {
  const user = await getCurrentUser();

  const organization = await prisma.organization.findUnique({
    where: {
      id: user?.organizationId ?? '',
    },
  });

  return (
    <div>
      <Navbar />
      <div className="border-b-[1px] bg-white p-8">
        <div className="mx-auto flex max-w-screen-lg items-center justify-between">
          <h2 className="max-w-screen-lg text-2xl text-neutral-500">
            Organization{' '}
            <span className="font-semibold text-neutral-800">
              {organization?.name}
            </span>
          </h2>
        </div>
      </div>
      <div className="min-h-[calc(100vh-163px)] bg-gray-50">
        <div className="mx-auto max-w-screen-sm p-4 pt-8">
          <Card>
            <CardContent className="pt-6">
              <OrganizationForm organization={organization} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
