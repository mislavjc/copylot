import { BarChart } from 'components/@charts/bar';
import { CodeBlock } from 'components/code-block';
import { Icons } from 'components/icons';

import { linkData, processStats } from 'lib/charts';

import { getVariationStatsByExperimentId } from 'db/clickhouse';

interface ChartProps {
  experimentId: string;
}

export const getStats = async (experimentId: string) => {
  const stats = await getVariationStatsByExperimentId(experimentId);

  const linkedData = await linkData(stats);

  return processStats(linkedData);
};

const colors = {
  experiment_click: '#2563eb',
  experiment_view: '#93c5fd',
};

export const Chart = async ({ experimentId }: ChartProps) => {
  const stats = await getStats(experimentId);

  return (
    <div className="h-[50vh] w-full">
      {stats.length > 0 ? (
        <BarChart
          data={stats}
          keys={['experiment_view', 'experiment_click']}
          tooltipKeys={[
            'name',
            'experiment_view',
            'experiment_click',
            'click_through_rate',
          ]}
          colors={colors}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <Icons.serverOff className="size-32" />
          <h2 className="text-2xl font-semibold">No data available</h2>
          <p>When experiment gets views a graph will be shown</p>
        </div>
      )}
    </div>
  );
};
