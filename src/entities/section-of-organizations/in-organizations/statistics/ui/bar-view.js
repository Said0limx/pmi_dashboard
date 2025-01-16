import { Fragment, useState } from 'react';
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

import { useStrokeColor } from '@/shared/hooks';
import usePagination from '@/shared/hooks/use-pagination/use-pagination';
import { useAuthStore } from '@/shared/store/use-auth-store';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Pagination } from '@/shared/ui';
import { CustomLegendRecharts } from '@/shared/ui/custom-legend-recharts';
import { CustomTooltipRecharts } from '@/shared/ui/custom-tooltip-recharts';
import { colors } from '@/shared/variables/colors';
const BarView = ({ data, headers, isLoading }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { authority_ids } = useFilterStore();
  const { userDetails } = useAuthStore();

  return (
    <div className='h-[92%] flex flex-col gap-5 overflow-auto mt-5'>
      {authority_ids?.length || userDetails?.authority_id !== 1 ? (
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
          {data.map((item, index) => (
            <Fragment key={item.id}>
              {activeTab === index ? (
                <Chart
                  headers={headers}
                  data={Array.isArray(item.data) ? item.data : [item.data]}
                  isLoading={isLoading}
                />
              ) : null}
            </Fragment>
          ))}
        </>
      ) : (
        <Chart headers={headers} data={data} isLoading={isLoading} />
      )}
    </div>
  );
};

const Chart = ({ headers, data = [], isLoading }) => {
  const { title, breadcrumbs, ...headerOtherValues } = headers;
  const { setAuthorityField } = useFilterStore();
  const headersLength = Object.keys(headerOtherValues).length;
  const l = headersLength <= 1 ? 1.2 : headersLength;
  const { nextPage, pageCount, pageNumber, changePage, previousPage, start, end } = usePagination(
    data,
    20,
  );

  const slicedData = data?.slice(start, end);

  const stroke = useStrokeColor();
  if (isLoading) {
    return null;
  }
  const containerHeight = slicedData?.length * 33 * l + 100;

  return (
    <>
      <div className='overflow-y-auto h-full overflow-x-hidden'>
        <ResponsiveContainer height={containerHeight > 100 ? containerHeight : 200} width='100%'>
          <BarChart barSize={25} layout='vertical' data={slicedData} barCategoryGap={10}>
            <Legend verticalAlign='top' content={<CustomLegendRecharts titlesObject={headers} />} />
            <CartesianGrid strokeDasharray={'3 3'} vertical={true} horizontal={true} />
            <YAxis
              type='category'
              dataKey={'title'}
              className='text-[15px] cursor-pointer'
              interval={0}
              tickFormatter={(value) => {
                const limit = 70; // put your maximum character
                if (value.length < limit) return value;
                return `${value.substring(0, limit)}...`;
              }}
              // tick={<CustomizedAxisTick />}
              stroke={stroke}
              onClick={(item) => {
                if (slicedData[item.index].has_child) {
                  setAuthorityField(slicedData[item.index].id);
                }
              }}
              width={350}
              textAnchor='end'
            />
            <XAxis type='number' stroke={stroke} />
            <Tooltip
              cursor={{ fill: '#172a93cc' }}
              content={<CustomTooltipRecharts titlesObject={headers} />}
            />
            {slicedData?.map((item) => (
              <ReferenceArea
                key={item.title}
                y1={item.title}
                y2={item.title}
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
                <LabelList
                  dataKey={key}
                  position='insideBottom'
                  angle={0}
                  offset={7}
                  fill='white'
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      {pageCount > 1 && (
        <div className='mt-5 flex gap-2'>
          <Pagination
            pageCount={pageCount}
            changePage={changePage}
            previousPage={previousPage}
            nextPage={nextPage}
            pageNumber={pageNumber}
          />
        </div>
      )}
    </>
  );
};

export default BarView;
