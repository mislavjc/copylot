'use client';

import { ResponsiveChoropleth } from '@nivo/geo';

import countriesJson from './world_countries.json';

interface CloroplethMapProps {
  data: Array<{
    id: string;
    value: number;
  }>;
  highestCountryCount: number;
}

export const CloroplethMap = ({
  data,
  highestCountryCount,
}: CloroplethMapProps) => {
  return (
    <ResponsiveChoropleth
      data={data}
      features={countriesJson.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      colors="reds"
      domain={[0, highestCountryCount]}
      label="properties.name"
      valueFormat=".2"
      projectionTranslation={[0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={0.5}
      borderColor="#152538"
      tooltip={({ feature }) => {
        if (!feature.value) return null;

        return (
          <div className="bg-slate-50 px-2 py-1 rounded text-sm">
            <div className=" font-bold">{feature.label}</div>
            <span className="font-bold text-red-600">{feature.value}</span> sessions
          </div>
        );
      }}
      unknownColor="transparent"
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'column',
          justify: true,
          translateX: 20,
          translateY: -100,
          itemsSpacing: 0,
          itemWidth: 94,
          itemHeight: 18,
          itemDirection: 'left-to-right',
          itemTextColor: '#444444',
          itemOpacity: 0.85,
          symbolSize: 18,
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000000',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
