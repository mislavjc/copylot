import { ToneDescription } from '@prisma/client/edge';

import { DashboardCard } from 'components/@dashboard/card';
import { Icons } from 'components/icons';

import { getProjectDataByUrl } from 'lib/api/projects';

import { AppParams } from 'types';

export const metadata = {
  title: 'Copylot | Dashboard',
  description: 'Manage your project',
};

interface DashboardPageProps extends AppParams {}

export const dynamic = 'force-dynamic';

const DashboardPage = async ({ params }: DashboardPageProps) => {
  const projectData = await getProjectDataByUrl(params.project);

  const countSetFields = (obj: ToneDescription | {}): number => {
    const validFieldCount = Object.values(obj).filter(
      (value) => value != null && value !== '',
    ).length;

    return Math.max(validFieldCount - 3, 0);
  };

  const toneFieldsSet = countSetFields(projectData?.toneDescription || {});

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <DashboardCard
        icon={<Icons.experiments />}
        title="Experiments"
        count={projectData?._count.experiments || 0}
        description="experiments created"
        link={`/${params.project}/dashboard/experiments`}
        buttonText="View Experiments"
      />
      <DashboardCard
        icon={<Icons.library />}
        title="Prompt library"
        count={projectData?._count.promptLibraries || 0}
        description="prompts created"
        link={`/${params.project}/dashboard/prompt-library`}
        buttonText="View Prompt library"
      />
      <DashboardCard
        icon={<Icons.sliders />}
        title="Tone Settings"
        count={toneFieldsSet}
        description="tone settings set"
        link={`/${params.project}/dashboard/settings`}
        buttonText="View Tone Settings"
      />
    </div>
  );
};

export default DashboardPage;
