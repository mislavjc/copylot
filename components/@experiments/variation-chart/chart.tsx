import { getVariationStatsByExperimentId } from 'db/clickhouse';

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
      <BarChart
        data={stats}
        keys={['experiment_view', 'experiment_click']}
        colors={colors}
      />
    </div>
  );
};
