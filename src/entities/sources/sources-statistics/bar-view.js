import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useSetRegionOrDistrictId, useStrokeColor } from '@/shared/hooks';
import { CustomLegendRecharts } from '@/shared/ui/custom-legend-recharts';
import { CustomTooltipRecharts } from '@/shared/ui/custom-tooltip-recharts';
import { colors } from '@/shared/variables/colors';

const BarView = ({ data, headers, isLoading }) => {
  const { title, ...headerOtherValues } = headers;
  const { handleSet } = useSetRegionOrDistrictId();

  const headersLength = Object.keys(headerOtherValues).length;
  const l = headersLength <= 1 ? 1.2 : headersLength;
  const stroke = useStrokeColor();
  if (isLoading) {
    return null;
  }
  return (
    <div className='overflow-y-auto overflow-x-hidden max-h-[93%]'>
      <ResponsiveContainer height={data.length * 33 * l} width='100%'>
        <BarChart barSize={25} layout='vertical' data={data} barCategoryGap={10}>
          <Legend verticalAlign='top' content={<CustomLegendRecharts titlesObject={headers} />} />
          <CartesianGrid strokeDasharray={'3 3'} vertical={true} horizontal={true} />
          <YAxis
            type='category'
            dataKey='source'
            className='text-[15px] cursor-pointer'
            interval={0}
            stroke={stroke}
            onClick={(item) => {
              handleSet(data[item.index].id);
            }}
            width={160}
            textAnchor='end'
          />

          <XAxis type='number' stroke={stroke} />
          <Tooltip
            cursor={{ fill: '#172a93cc' }}
            content={<CustomTooltipRecharts titlesObject={headers} />}
          />
          {data.map((item, index) => (
            <ReferenceArea
              key={item.source}
              y1={item.source}
              y2={item.source}
              stroke='#f2f2f2'
              fill='transparent'
              strokeOpacity={1}
              strokeDasharray={'3 3'}
            />
          ))}
          <defs>
            {colors.slice(0, headersLength).map((color, index) => (
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
          {Object.keys(headerOtherValues).map((key, index) => (
            <Bar
              radius={[0, 30, 30, 0]}
              minPointSize={50}
              dataKey={key}
              key={key}
              fill={`url(#colorUv${index})`}
            >
              <LabelList dataKey={key} position='insideBottom' angle={0} offset={7} fill='white' />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarView;
