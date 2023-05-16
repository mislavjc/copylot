import { DataTableWrapper } from '@/components/@experiments/data-table-wrapper';
import { getExperiments } from '@/lib/api/experiments';
import { AppParams } from '@/types/indext';

export const metadata = {
  title: 'Experiments',
  description: 'Manage your experiments',
};

interface ExperimentsPageProps extends AppParams {}

const ExperimentsPage = async ({ params }: ExperimentsPageProps) => {
  const data = await getExperiments(params.project);

  return (
    <div className="container py-10 mx-auto">
      <DataTableWrapper project={params.project} data={data} />
    </div>
  );
};

export default ExperimentsPage;
