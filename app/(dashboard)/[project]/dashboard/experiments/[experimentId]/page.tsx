import { Card, CardContent, CardHeader, CardTitle } from 'ui/card';

import { Chart } from 'components/@experiments/variation-chart/chart';
import { columns } from 'components/@experiments/variation-table/columns';
import { VariationPlayground } from 'components/@experiments/variation-table/playground';
import { DataTable } from 'components/data-table';

import { getExperiment } from 'lib/api/experiments';
import { getPromptLibraty } from 'lib/api/prompt-library';
import { getToneByProjectId } from 'lib/api/tone';

import { AppParams } from 'types';

export const metadata = {
  title: 'Copylot | Experiment',
  description: 'Manage your experiment',
};

interface ExperimentPageProps extends AppParams {
  params: AppParams['params'] & { experimentId: string };
}

const ExperimentPage = async ({ params }: ExperimentPageProps) => {
  const experiment = await getExperiment(params.experimentId);
  const promptLibrary = await getPromptLibraty(params.project);
  const toneDescription = await getToneByProjectId(experiment!.projectId);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Experiment clicks and views</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart experimentId={experiment?.id!} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Variations</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={experiment?.variations ?? []} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Playground</CardTitle>
        </CardHeader>
        <CardContent>
          <VariationPlayground
            experimentId={params.experimentId}
            promptLibrary={promptLibrary}
            toneDescription={toneDescription}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperimentPage;
