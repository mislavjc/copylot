'use client';

import { AxisBottom, AxisLeft } from '@visx/axis';
import { localPoint } from '@visx/event';
import { Grid } from '@visx/grid';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarStack } from '@visx/shape';
import { defaultStyles, TooltipWithBounds, useTooltip } from '@visx/tooltip';
import { format } from 'date-fns';

import { formatKey } from 'lib/utils';

type ChartData<T> = T & {
  date?: string;
  name?: string;
};

interface Props<T extends { [K in string]: number | string | undefined }> {
  data: ChartData<T>[];
  keys: (keyof T)[];
  colors: { [key: string]: string };
}

export const BarChart = <T extends {}>({ data, keys, colors }: Props<T>) => {
  const { showTooltip, hideTooltip, tooltipData, tooltipTop, tooltipLeft } =
    useTooltip<ChartData<T>>();

  const getLabel = (d: ChartData<T>) => d.date || d.name || '';

  return (
    <ParentSize className="relative">
      {(parent) => {
        const { width, height } = parent;

        const margin = { top: 20, bottom: 40, left: 50, right: 20 };

        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        const maxCount = Math.max(
          ...data.map((d) =>
            keys.reduce((acc, key) => acc + Number(d[key]), 0),
          ),
        );

        const roundedMax = Math.ceil(maxCount / 4) * 4;

        const xScale = scaleBand({
          domain: data.map(getLabel),
          range: [0, xMax],
          padding: 0.4,
        });

        const yScale = scaleLinear({
          domain: [0, roundedMax],
          range: [yMax, 0],
        });

        return (
          <div className="relative">
            <svg width={width} height={height}>
              <Group left={margin.left} top={margin.top}>
                <Grid
                  xScale={xScale}
                  yScale={yScale}
                  width={xMax}
                  height={yMax}
                  stroke="#e0e0e0"
                  strokeOpacity={0.5}
                />
                <BarStack
                  data={data}
                  keys={keys as (string | number)[]}
                  x={getLabel}
                  xScale={xScale}
                  yScale={yScale}
                  color={(key: keyof typeof colors) => colors[key]}
                >
                  {(barStacks) => {
                    return barStacks.map((barStack) => {
                      return barStack.bars.map((bar) => {
                        return (
                          <rect
                            key={`bar-stack-${barStack.index}-${bar.index}`}
                            x={bar.x}
                            y={bar.y}
                            height={bar.height < 0 ? 0 : bar.height}
                            width={bar.width}
                            fill={bar.color}
                            onMouseMove={(event) => {
                              const coords = localPoint(event) || {
                                x: 0,
                                y: 0,
                              };

                              showTooltip({
                                tooltipData: bar.bar.data,
                                tooltipTop: coords.y,
                                tooltipLeft: coords.x,
                              });
                            }}
                            onMouseLeave={hideTooltip}
                            onClick={() => {
                              alert(
                                `clicked: ${JSON.stringify(
                                  Object.values(bar.bar.data),
                                )}`,
                              );
                            }}
                          />
                        );
                      });
                    });
                  }}
                </BarStack>
                <AxisBottom
                  scale={xScale}
                  top={yMax}
                  numTicks={8}
                  labelOffset={12}
                  tickLabelProps={{
                    className: 'text-sm font-sans text-neutral-500',
                  }}
                  hideTicks
                  hideAxisLine
                />
                <AxisLeft
                  scale={yScale}
                  numTicks={4}
                  tickLabelProps={{
                    className: 'text-sm font-sans text-neutral-500',
                  }}
                  hideTicks
                  hideAxisLine
                />
              </Group>
            </svg>
            {tooltipData && (
              <TooltipWithBounds
                top={tooltipTop}
                left={tooltipLeft}
                style={defaultStyles}
              >
                <div className="flex flex-col gap-1 p-1">
                  {Object.entries(tooltipData).map(([key, value]) => (
                    <div key={key}>
                      <span>{formatKey(key)}</span>:{' '}
                      <span className="font-semibold">
                        {key === 'date'
                          ? format(new Date(value as string), 'MMMM do yyyy')
                          : value}
                      </span>
                    </div>
                  ))}
                </div>
              </TooltipWithBounds>
            )}
          </div>
        );
      }}
    </ParentSize>
  );
};
