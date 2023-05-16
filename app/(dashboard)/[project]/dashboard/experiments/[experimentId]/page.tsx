import { getExperiment } from '@/lib/api/experiments';
import { AppParams } from '@/types/indext';

export interface ExperimentPageProps extends AppParams {
  params: AppParams['params'] & { experimentId: string };
}
const ExperimentPage = async ({ params }: ExperimentPageProps) => {
  const experiment = await getExperiment(params.experimentId);

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Experiment{' '}
        <span className="text-gray-500">&apos;{experiment?.name}&apos;</span>
      </h1>
      <h2 className="mt-2 text-gray-500 tex4t-xl">{experiment?.description}</h2>
    
    </div>
  );
};

export default ExperimentPage;
