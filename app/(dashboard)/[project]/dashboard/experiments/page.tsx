import { Card, CardContent } from 'ui/card';

import { DataTableWrapper } from 'components/@experiments/experiments-table/wrapper';

import { getExperiments } from 'lib/api/experiments';

import { AppParams } from 'types';

export const metadata = {
  title: 'Copylot | Experiments',
  description: 'Manage your experiments',
};

interface ExperimentsPageProps extends AppParams {}

export const dynamic = 'force-dynamic';

const ExperimentsPage = async ({ params }: ExperimentsPageProps) => {
  const data = await getExperiments(params.project);

  return (
    <div className="mx-auto">
      <Card>
        <CardContent className="pt-2">
          <DataTableWrapper project={params.project} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperimentsPage;
