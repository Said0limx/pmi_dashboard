import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useStrokeColor } from '@/shared/hooks';
import { useFilterToggleStore } from '@/shared/store/use-filter-toggle-store';
import { CustomLegendRecharts } from '@/shared/ui';
import { CustomTooltipRecharts } from '@/shared/ui/custom-tooltip-recharts';
import { colors } from '@/shared/variables/colors';
export const GraphicView = ({ data, headers }) => {
  const { opened } = useFilterToggleStore();
  const mappedData = useMemo(() => {
    if (data)
      return data.map(({ source, ...rest }, index) => {
        return {
          ...rest,
          title: headers.source[index].title,
        };
      });
    return [];
  }, [data]);

  const headersLength = Object.keys(headers.main_column_key).length;
  const l = headersLength <= 1 ? 1.2 : headersLength;
  const stroke = useStrokeColor();
  return (
    <div className='overflow-y-auto overflow-x-hidden max-h-[93%]'>
      <ResponsiveContainer height={mappedData.length * 33 * l} width='100%'>
        <BarChart
          barSize={25}
          width={opened ? 1200 : 1530}
          layout='vertical'
          height={mappedData.length * 33 * l}
          data={mappedData}
          barCategoryGap={10}
        >
          <CartesianGrid strokeDasharray='3 3' stroke={stroke} />
          <YAxis
            type='category'
            dataKey='title'
            className='text-[15px] cursor-pointer'
            width={250}
            interval={0}
            textAnchor='end'
            stroke={stroke}
          />
          <XAxis type='number' stroke={stroke} />
          <defs>
            {colors.map((color, index) => (
              <linearGradient
                key={index}
                id={`colorUv${index}`}
                x1='0'
                y1='100%'
                x2='100%'
                y2='100%'
                spreadMethod='reflect'
              >
                <stop offset='0' stopColor={`${color}70`} />
                <stop offset='1' stopColor={color} />
              </linearGradient>
            ))}
          </defs>
          <Legend
            verticalAlign='top'
            content={<CustomLegendRecharts titlesObject={headers.main_column_key} />}
          />
          <Tooltip
            cursor={{ fill: '#172a93cc' }}
            content={<CustomTooltipRecharts titlesObject={headers.main_column_key} />}
          />
          {Object.keys(headers?.main_column_key || {}).map((key, index) => {
            return (
              <Bar
                key={key}
                minPointSize={50}
                dataKey={key}
                radius={[0, 10, 10, 0]}
                fill={`url(#colorUv${index})`}
              >
                <LabelList
                  dataKey={key}
                  position='insideBottom'
                  angle={0}
                  offset={7}
                  fill='white'
                />
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
