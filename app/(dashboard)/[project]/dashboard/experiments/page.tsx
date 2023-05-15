import { columns } from '@/components/@experiments/columns';
import { DataTable } from '@/components/@experiments/data-table';
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
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ExperimentsPage;
