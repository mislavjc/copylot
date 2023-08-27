import { Variation } from '@prisma/client/edge';

import { VariationStatsByExperimentIdRow } from 'db/clickhouse';
import prisma from 'db/prisma';

interface StatsData extends VariationStatsByExperimentIdRow {
  name: string;
  value: string;
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
      value: variation?.value ?? 'Unknown',
    };
  });

  return statsData;
};

export interface ProcessedData {
  name: string;
  value: string;
  experiment_click: string;
  experiment_view: string;
  click_through_rate: string;
}

export const processStats = (stats: StatsData[]) => {
  const processedData: ProcessedData[] = [];
  const viewMap = new Map<string, string>();
  const clickMap = new Map<string, string>();
  const valueMap = new Map<string, string>();

  stats.forEach((item) => {
    if (item.event_name === 'experiment_view') {
      viewMap.set(item.name, item.count);
    } else if (item.event_name === 'experiment_click') {
      clickMap.set(item.name, item.count);
    }

    valueMap.set(item.name, item.value);
  });

  const variationNames = new Set(stats.map((item) => item.name));

  variationNames.forEach((name) => {
    const viewCount = viewMap.get(name) || '0';
    const clickCount = clickMap.get(name) || '0';
    const value = valueMap.get(name) || 'Unknown';

    const click_through_rate =
      Math.round((parseInt(clickCount) / parseInt(viewCount)) * 10_000) / 100 +
      '%';

    processedData.push({
      name,
      value,
      experiment_click: clickCount,
      experiment_view: viewCount,
      click_through_rate,
    });
  });

  return processedData;
};
