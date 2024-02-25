import { Card, CardContent, CardHeader, CardTitle } from 'ui/card';

import { Chart } from 'components/@experiments/variation-chart/chart';
import { columns } from 'components/@experiments/variation-table/columns';
import { VariationPlayground } from 'components/@experiments/variation-table/playground';
import { CodeBlock } from 'components/code-block';
import { DataTable } from 'components/data-table';
import { Icons } from 'components/icons';

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

export const dynamic = 'force-dynamic';

const ExperimentPage = async ({ params }: ExperimentPageProps) => {
  const experiment = await getExperiment(params.experimentId);
  const promptLibrary = await getPromptLibraty(params.project);
  const toneDescription = await getToneByProjectId(experiment!.projectId);

  const getVariationCode = `const variation = await getVariation('${params.experimentId}');`;

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
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p>Get variation data by fetching by experiment ID</p>
            <CodeBlock code={getVariationCode} />
            <p>Shape of data</p>
            <CodeBlock code={shapeOfDataCode} />
            <p>Logging view and click events</p>
            <CodeBlock code={usageCode} />
            <p className="text-sm">
              <Icons.info className="mr-1 inline-block size-4" />
              Clicks are automatically logged for all buttons that have
              variation id and experiment id attached.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperimentPage;

const shapeOfDataCode = `typeof variation === {
  id: string,
  value: string
}`;

const usageCode = `<h1 data-variation={variation.id} data-experiment={experimentId}>{variation.value}</h1>
<button data-variation={variation.id} data-experiment={experimentId}>CTA</button>`;
