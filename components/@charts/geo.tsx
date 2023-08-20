'use client';

import { localPoint } from '@visx/event';
import { Graticule, Mercator } from '@visx/geo';
import { ParentSize } from '@visx/responsive';
import { scaleQuantize } from '@visx/scale';
import { defaultStyles, TooltipWithBounds, useTooltip } from '@visx/tooltip';
import * as topojson from 'topojson-client';

import topology from './world-topo.json';

export const background = '#F9FAFB';

interface CountryData {
  countryCode: string;
  value: number;
}

interface GeoMercatorProps {
  data: CountryData[];
}

interface FeatureShape {
  type: 'Feature';
  id: string;
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { name: string };
}

// @ts-expect-error
const world = topojson.feature(topology, topology.objects.units) as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

const maxRange = 100;
const opacityLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

const opacityScale = scaleQuantize({
  domain: [0, maxRange],
  range: opacityLevels,
});

const getFillColor = (value: number) => {
  const opacity = opacityScale(value);

  return `rgba(30, 64, 175, ${opacity})`;
};

export const CloroplethMap = ({ data }: GeoMercatorProps) => {
  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip<{
      countryName: string;
      value: number;
    }>();

  return (
    <ParentSize>
      {({ width, height }) => {
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = (width / 630) * 100;

        return (
          <div className="relative">
            <svg width={width} height={height}>
              <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={background}
                rx={14}
              />
              <Mercator<FeatureShape>
                data={world.features}
                scale={scale}
                translate={[centerX, centerY + 50]}
              >
                {(mercator) => (
                  <g>
                    <Graticule
                      graticule={(g) => mercator.path(g) || ''}
                      stroke="rgba(33,33,33,0.05)"
                    />
                    {mercator.features.map(({ feature, path }, i) => {
                      const countryData = data.find(
                        (d) => d.countryCode === feature.id,
                      );
                      const fillColor = countryData
                        ? getFillColor(countryData.value)
                        : 'rgba(30, 64, 175, 0)';

                      return (
                        <path
                          key={`map-feature-${i}`}
                          d={path || ''}
                          fill={fillColor}
                          stroke="#000000"
                          strokeWidth={0.2}
                          className="transition-all duration-300 hover:stroke-blue-800 hover:stroke-1"
                          onMouseMove={(event) => {
                            if (countryData) {
                              const coords = localPoint(event) || {
                                x: 0,
                                y: 0,
                              };
                              showTooltip({
                                tooltipData: {
                                  countryName: feature.properties.name,
                                  value: countryData.value,
                                },
                                tooltipTop: coords.y,
                                tooltipLeft: coords.x,
                              });
                            }
                          }}
                          onMouseLeave={hideTooltip}
                        />
                      );
                    })}
                  </g>
                )}
              </Mercator>
            </svg>
            {tooltipData && (
              <TooltipWithBounds
                top={tooltipTop}
                left={tooltipLeft}
                style={defaultStyles}
                className="flex flex-col gap-1 p-1"
              >
                <span className="font-semibold">{tooltipData.countryName}</span>
                <span>
                  <span className="font-semibold">{tooltipData.value}</span>{' '}
                  visitors
                </span>
              </TooltipWithBounds>
            )}
          </div>
        );
      }}
    </ParentSize>
  );
};
