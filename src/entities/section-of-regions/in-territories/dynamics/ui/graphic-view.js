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

import { useIdentifyAreaKey, useSetRegionOrDistrictId, useStrokeColor } from '@/shared/hooks';
import { useFilterToggleStore } from '@/shared/store/use-filter-toggle-store';
import { CustomLegendRecharts, CustomTooltipRecharts } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

const GraphicView = ({ data, headers }) => {
  const { handleSet } = useSetRegionOrDistrictId();
  const { areaKey } = useIdentifyAreaKey();
  const { opened } = useFilterToggleStore();
  const stroke = useStrokeColor();
  return (
    <div className='mt-5 max-h-[93%] overflow-auto'>
      <div className='relative'>
        <div className='absolute top-[45px] bottom-[35px] left-0 w-[99.7%] border-x border-main_dark_blue dark:border-white  z-0 flex flex-col justify-between '>
          {Array.from({ length: headers.head_count + 1 }, (_, index) => (
            <div key={index} className='w-full h-[1px] bg-main_dark_blue dark:bg-white'></div>
          ))}
        </div>
        <ResponsiveContainer height={data.length * 33 * 2} width='100%'>
          <BarChart layout='vertical' data={data}>
            <YAxis type='category' stroke={stroke} width={250} yAxisId='0' dataKey='name' />
            <YAxis
              type='category'
              yAxisId='1'
              stroke={stroke}
              dataKey={areaKey}
              width={170}
              className='cursor-pointer'
              onClick={(e) => {
                const findKey = data.find((item) => item[areaKey] === e.value);
                handleSet(findKey[`${areaKey}_id`]);
              }}
              allowDuplicatedCategory={false}
            />
            <XAxis type='number' />
            <CartesianGrid strokeDasharray='3 3' stroke={stroke} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={
                <CustomTooltipRecharts
                  titlesObject={{ first_period: '1-davr', second_period: '2-davr' }}
                />
              }
            />
            <Legend
              verticalAlign='top'
              content={
                <CustomLegendRecharts
                  titlesObject={{
                    first_period: '1-davr',
                    second_period: '2-davr',
                  }}
                />
              }
            />
            <Bar dataKey='first_period' minPointSize={50} radius={[0, 10, 10, 0]} fill={colors[0]}>
              <LabelList dataKey={'first_period'} position='insideBottom' fill='white' />
            </Bar>
            <Bar dataKey='second_period' minPointSize={50} radius={[0, 10, 10, 0]} fill={colors[1]}>
              <LabelList dataKey={'second_period'} position='insideBottom' fill='white' />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphicView;
