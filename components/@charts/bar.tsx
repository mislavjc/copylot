'use client';

import { AxisBottom, AxisLeft } from '@visx/axis';
import { Grid } from '@visx/grid';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { BarStack } from '@visx/shape';

type ChartData = {
  [key: string]: string | number | undefined;
};

type Props = {
  data: ChartData[];
  keys: string[];
  colors: { [key: string]: string };
};

export const BarChart: React.FC<Props> = ({ data, keys, colors }) => {
  const getLabel = (d: ChartData) => d.date || d.name || '';

  return (
    <ParentSize>
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
                keys={keys}
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
                          height={bar.height}
                          width={bar.width}
                          fill={bar.color}
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
        );
      }}
    </ParentSize>
  );
};
