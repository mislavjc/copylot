import { getVariationStatsByExperimentId } from 'db/clickhouse';
import { ServerOff } from 'lucide-react';

import { BarChart } from 'components/@charts/bar';

import { linkData, processStats } from 'lib/charts';

interface ChartProps {
  experimentId: string;
}

const getStats = async (experimentId: string) => {
  const stats = await getVariationStatsByExperimentId(experimentId);

  const linkedData = await linkData(stats);

  return processStats(linkedData);
};

const colors = {
  experiment_click: '#007bff',
  experiment_view: '#ff7f0e',
};

export const Chart = async ({ experimentId }: ChartProps) => {
  const stats = await getStats(experimentId);

  return (
    <div className="h-[50vh] w-full">
      {stats.length > 0 ? (
        <BarChart
          data={stats}
          keys={['experiment_view', 'experiment_click']}
          colors={colors}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <ServerOff className="h-32 w-32" />
          <h2 className="text-2xl font-semibold">No data available</h2>
          <p>When experiment gets views a graph will be shown</p>
        </div>
      )}
    </div>
  );
};
