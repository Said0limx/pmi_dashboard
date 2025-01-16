import { useState } from 'react';
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
import { useAuthStore } from '@/shared/store/use-auth-store';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { CustomLegendRecharts, CustomTooltipRecharts, Pagination } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

const GraphicView = ({ data, headers }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { authority_ids } = useFilterStore();
  const { userDetails } = useAuthStore();

  return (
    <div className='h-full'>
      {authority_ids.length > 0 || userDetails?.authority_id !== 1 ? (
        <>
          <div
            className={`border grid grid-cols-${data.length} gap-1 ${data.length}] rounded border-slate-200 dark:border-main_blue_3 p-1 gap-1 text-sm`}
          >
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center gap-1 dark:hover:bg-main_blue_1 p-1 rounded text-color cursor-pointer tracking-tighter ${activeTab === index && 'dark:bg-main_blue_1 bg-slate-200'}`}
                onClick={() => setActiveTab(index)}
              >
                {item.title}
              </div>
            ))}
          </div>
          {data.map(
            (item, index) =>
              index === activeTab && (
                <Chart key={item.title} data={item.children} headers={headers} />
              ),
          )}
        </>
      ) : (
        <Chart data={data} headers={headers} />
      )}
    </div>
  );
};

const Chart = ({ headers, data }) => {
  const { nextPage, pageCount, pageNumber, changePage, previousPage, start, end } = usePagination(
    data,
    10,
  );
  const { setAuthorityField } = useFilterStore();

  const slicedData = data.slice(start * headers.fields_count, end * headers.fields_count);
  const stroke = useStrokeColor();

  return (
    <>
      <div className='max-h-[76%] overflow-y-auto overflow-x-hidden'>
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
          <ResponsiveContainer height={slicedData.length * 33 * 2 + 100} width='100%'>
            <BarChart layout='vertical' data={slicedData}>
              <YAxis type='category' stroke={stroke} width={250} yAxisId='0' dataKey='name' />
              <YAxis
                type='category'
                yAxisId='1'
                dataKey={'title'}
                width={300}
                className='cursor-pointer'
                stroke={stroke}
                allowDuplicatedCategory={false}
                onClick={(item) => {
                  if (slicedData[item.index].has_child) {
                    setAuthorityField(slicedData[item.index].id);
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
      {pageCount > 1 ? (
        <div className='mt-4'>
          <Pagination
            pageCount={pageCount}
            changePage={changePage}
            previousPage={previousPage}
            nextPage={nextPage}
            pageNumber={pageNumber}
          />
        </div>
      ) : null}
    </>
  );
};
export default GraphicView;
