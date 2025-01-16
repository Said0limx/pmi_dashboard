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
import usePagination from '@/shared/hooks/use-pagination/use-pagination';
import { useFilterToggleStore } from '@/shared/store/use-filter-toggle-store';
import { CustomLegendRecharts, CustomTooltipRecharts, Pagination } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

const GraphicView = ({ data, headers }) => {
  const { nextPage, pageCount, pageNumber, changePage, previousPage, start, end } = usePagination(
    Array.from({ length: headers.head_count }),
    10,
  );
  const { opened } = useFilterToggleStore();
  const slicedData = data.slice(start * headers.fields_count, end * headers.fields_count);
  const stroke = useStrokeColor();
  return (
    <>
      <div className='h-[90%] overflow-y-auto overflow-x-hidden'>
        <div className='relative'>
          <div className='absolute top-[45px] bottom-[35px] left-0 w-[99.7%] border-x border-main_dark_blue dark:border-white  z-0 flex flex-col justify-between '>
            {Array.from({ length: headers.head_count + 1 }, (_, index) => (
              <div key={index} className='w-full h-[1px] bg-main_dark_blue dark:bg-white'></div>
            ))}
          </div>
          <ResponsiveContainer height={slicedData.length * 33 * 2} width='100%'>
            <BarChart layout='vertical' data={slicedData}>
              <YAxis type='category' stroke={stroke} width={250} yAxisId='0' dataKey='name' />
              <YAxis
                type='category'
                yAxisId='1'
                dataKey={'source'}
                width={300}
                stroke={stroke}
                className='cursor-pointer'
                allowDuplicatedCategory={false}
              />
              <XAxis type='number' stroke={stroke} />
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
              <Bar
                dataKey='first_period'
                minPointSize={50}
                radius={[0, 10, 10, 0]}
                fill={colors[0]}
              >
                <LabelList dataKey={'first_period'} position='insideBottom' fill='white' />
              </Bar>
              <Bar
                dataKey='second_period'
                minPointSize={50}
                radius={[0, 10, 10, 0]}
                fill={colors[1]}
              >
                <LabelList dataKey={'second_period'} position='insideBottom' fill='white' />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='mt-4'>
        <Pagination
          pageCount={pageCount}
          changePage={changePage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageNumber={pageNumber}
        />
      </div>
    </>
  );
};

export default GraphicView;
