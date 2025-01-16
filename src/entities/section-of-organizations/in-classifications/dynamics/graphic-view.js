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

import { useClassificationKey, useStrokeColor } from '@/shared/hooks';
import usePagination from '@/shared/hooks/use-pagination/use-pagination';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { CustomLegendRecharts, CustomTooltipRecharts, Pagination } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

const GraphicView = ({ data, headers }) => {
  const { nextPage, pageCount, pageNumber, changePage, previousPage, start, end } = usePagination(
    Array.from({ length: headers.head_count }),
    10,
  );

  const { classifierKey } = useClassificationKey();
  const slicedData = data.slice(start * headers.fields_count, end * headers.fields_count);
  const stroke = useStrokeColor();

  const {
    classificationFields: { classifier_type_id },
    setClassificationField,
  } = useFilterStore();
  return (
    <>
      <div className='max-h-[86%] overflow-y-auto overflow-x-hidden'>
        <div className='relative'>
          <div className='absolute top-[45px] bottom-[35px] left-0 w-[99.7%] border-x border-main_dark_blue dark:border-white  z-0 flex flex-col justify-between '>
            {Array.from(
              {
                length: slicedData.length / headers.fields_count + 1,
              },
              (_, index) => (
                <div key={index} className='w-full h-[1px] bg-main_dark_blue dark:bg-white'></div>
              ),
            )}
          </div>
          <ResponsiveContainer height={slicedData.length * 33 * 2} width='100%'>
            <BarChart layout='vertical' data={slicedData}>
              <YAxis type='category' stroke={stroke} width={250} yAxisId='0' dataKey='name' />
              <YAxis
                type='category'
                yAxisId='1'
                dataKey={classifierKey}
                width={300}
                className='cursor-pointer'
                stroke={stroke}
                allowDuplicatedCategory={false}
                onClick={(item) => {
                  const { problem_id, category_id } = slicedData[item.index];
                  if (classifier_type_id === 1) {
                    setClassificationField('category_id', category_id);
                  } else if (classifier_type_id === 2) {
                    if (category_id) {
                      setClassificationField('category_id', category_id);
                    }
                    setClassificationField('problem_id', problem_id);
                  }
                }}
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
