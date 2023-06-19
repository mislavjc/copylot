import { Variation } from '@prisma/client/edge';

import { BarChart } from '@/components/@charts/bar';
import {
  getVariationStatsByExperimentId,
  VariationStatsByExperimentIdRow,
} from '@/db/clickhouse';
import prisma from '@/db/prisma';

interface ChartProps {
  experimentId: string;
}

const getStats = async (experimentId: string) => {
  const stats = await getVariationStatsByExperimentId(experimentId);

  await linkData(stats);

  return stats as StatsData[];
};

const colors = [
  'rgba(75, 192, 192, 0.2)', // Cyan
  'rgba(255, 99, 132, 0.2)', // Red
  'rgba(255, 206, 86, 0.2)', // Yellow
  'rgba(54, 162, 235, 0.2)', // Blue
];

const borderColors = [
  'rgba(75, 192, 192, 1)', // Cyan
  'rgba(255, 99, 132, 1)', // Red
  'rgba(255, 206, 86, 1)', // Yellow
  'rgba(54, 162, 235, 1)', // Blue
];

export const Chart = async ({ experimentId }: ChartProps) => {
  const stats = await getStats(experimentId);
  const groups: { [key: string]: StatsData[] } = {};

  for (const record of stats) {
    if (!groups[record.event_name]) {
      groups[record.event_name] = [];
    }
    groups[record.event_name].push(record);
  }

  const chartData = {
    labels: Array.from(new Set(stats.map((record) => record.name))),
    datasets: Object.keys(groups).map((event_name, i) => ({
      label: event_name.replace(/_/g, ' '),
      data: groups[event_name].map((record) => Number(record.count)),
      backgroundColor: colors[i % colors.length], // Use colors cyclically
      borderColor: borderColors[i % borderColors.length],
      borderWidth: 1,
    })),
  };

  return <BarChart data={chartData} />;
};

interface StatsData extends VariationStatsByExperimentIdRow {
  name: string;
}

const linkData = async (
  data: VariationStatsByExperimentIdRow[]
): Promise<void> => {
  const eventValues = data.map((record) => record.event_value);

  const variations: Variation[] = await prisma.variation.findMany({
    where: {
      id: {
        in: eventValues,
      },
    },
  });

  for (const record of data as StatsData[]) {
    const variation = variations.find((v) => v.id === record.event_value);

    record.name = variation?.name ?? 'Unknown';
  }
};
