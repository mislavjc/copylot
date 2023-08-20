import { Variation } from '@prisma/client/edge';
import { VariationStatsByExperimentIdRow } from 'db/clickhouse';
import prisma from 'db/prisma';

interface StatsData extends VariationStatsByExperimentIdRow {
  name: string;
}

export const linkData = async (
  data: VariationStatsByExperimentIdRow[],
): Promise<StatsData[]> => {
  const eventValues = data.map((record) => record.event_value);

  const variations: Variation[] = await prisma.variation.findMany({
    where: {
      id: {
        in: eventValues,
      },
    },
  });

  const statsData: StatsData[] = data.map((record) => {
    const variation = variations.find((v) => v.id === record.event_value);
    return {
      ...record,
      name: variation?.name ?? 'Unknown',
    };
  });

  return statsData;
};

interface ProcessedData {
  name: string;
  experiment_click: string;
  experiment_view: string;
  [key: string]: string | number;
}

export const processStats = (stats: StatsData[]) => {
  const processedData: ProcessedData[] = [];
  const viewMap = new Map<string, string>();
  const clickMap = new Map<string, string>();

  stats.forEach((item) => {
    if (item.event_name === 'experiment_view') {
      viewMap.set(item.name, item.count);
    } else if (item.event_name === 'experiment_click') {
      clickMap.set(item.name, item.count);
    }
  });

  const variationNames = new Set(stats.map((item) => item.name));

  variationNames.forEach((name) => {
    const viewCount = viewMap.get(name) || '0';
    const clickCount = clickMap.get(name) || '0';
    processedData.push({
      name,
      experiment_click: clickCount,
      experiment_view: viewCount,
    });
  });

  return processedData;
};
