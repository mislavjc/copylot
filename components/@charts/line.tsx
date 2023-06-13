'use client';

import { ResponsiveLine } from '@nivo/line';

type DataPoint = {
  y: number;
  x: string;
};

type DataSet = {
  id: string;
  data: DataPoint[];
};

type LineChartData = DataSet[];

interface LineChartProps {
  data: LineChartData;
}

export const LineChart = ({ data }: LineChartProps) => {
  return (
    <ResponsiveLine
      animate
      axisBottom={{
        format: '%b %d',
        tickValues: 'every week',
      }}
      curve="monotoneX"
      data={data}
      enablePointLabel
      margin={{
        bottom: 60,
        left: 80,
        right: 20,
        top: 20,
      }}
      pointBorderColor={{
        from: 'color',
        modifiers: [['darker', 0.3]],
      }}
      useMesh
      xFormat="time:%Y-%m-%d"
      xScale={{
        format: '%Y-%m-%d',
        precision: 'day',
        type: 'time',
        useUTC: false,
      }}
      yScale={{
        type: 'linear',
      }}
      defs={[
        {
          colors: [
            {
              color: 'inherit',
              offset: 0,
            },
            {
              color: 'inherit',
              offset: 100,
              opacity: 100,
            },
          ],
          id: 'gradientA',
          type: 'linearGradient',
        },
      ]}
      enableArea
      enableSlices="x"
      fill={[
        {
          id: 'gradientA',
          match: '*',
        },
      ]}
    />
  );
};
