import { Fragment, useState } from 'react';
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
import useAreaKeyForTerritory from '@/shared/hooks/use-area-key-for-territory';
import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';
import usePagination from '@/shared/hooks/use-pagination/use-pagination';
import { useAuthStore } from '@/shared/store/use-auth-store';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { CustomLegendRecharts, CustomTooltipRecharts, Pagination } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

const GraphicView = ({ data = [], headers = {}, isLoading }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { authority_ids } = useFilterStore();
  const { userDetails } = useAuthStore();

  return (
    <div className='h-[80%] flex flex-col gap-5  mt-5'>
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
                <Chart headers={headers} data={item.children} isLoading={isLoading} />
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

const Chart = ({ data = [], headers = {} }) => {
  const stroke = useStrokeColor();
  const headsArray = Array.from({ length: data.length * headers.fields_count });
  const { nextPage, pageCount, pageNumber, changePage, previousPage, start, end } = usePagination(
    headsArray,
    20,
  );

  const { classifierKey } = useClassificationKey();
  const { classification, organization, territory } = useDetermineReportCategory();
  const areaKey = useAreaKeyForTerritory();
  const slicedData = data.slice(start * headers.fields_count, end * headers.fields_count);
  const {
    areaFields: { territory_type_id },
    classificationFields: { classifier_type_id },
    setClassificationField,
    setAreaField,
    setAuthorityField,
  } = useFilterStore();

  return (
    <div className='h-full flex flex-col justify-between'>
      <div className='overflow-y-auto overflow-x-hidden' key={headsArray.length}>
        <div className='relative'>
          <div className='absolute top-[45px] bottom-[35px] left-0 w-[99.7%] border-x border-main_dark_blue dark:border-white  z-0 flex flex-col justify-between '>
            {Array.from({ length: slicedData.length / headers.fields_count + 1 }, (_, index) => (
              <div key={index} className='w-full h-[1px] bg-main_dark_blue dark:bg-white'></div>
            ))}
          </div>
          <ResponsiveContainer height={slicedData.length * 33 * 2 + 100} width='100%'>
            <BarChart layout='vertical' data={slicedData}>
              <YAxis type='category' stroke={stroke} width={250} yAxisId='0' dataKey='name' />
              <YAxis
                type='category'
                yAxisId='1'
                dataKey={
                  organization
                    ? 'title'
                    : classification
                      ? classifierKey
                      : territory
                        ? areaKey
                        : 'id'
                }
                width={300}
                tickFormatter={(value) => {
                  const limit = 70;
                  if (value.length < limit) return value;
                  return `${value.substring(0, limit)}...`;
                }}
                stroke={stroke}
                className='cursor-pointer'
                allowDuplicatedCategory={false}
                onClick={(item) => {
                  if (organization) {
                    if (slicedData[item.index].has_child) {
                      setAuthorityField(slicedData[item.index].id);
                    }
                  }

                  if (territory) {
                    if (territory_type_id === 1) {
                      setAreaField('region_id', data[item.index]['region_id']);
                    }
                    if (territory_type_id === 2) {
                      setAreaField('region_id', data[item.index]['region_id']);
                      setAreaField('district_id', data[item.index]['district_id']);
                    }
                  }
                  if (classification) {
                    if (classifier_type_id === 1) {
                      setClassificationField('category_id', data[item.index]['category_id']);
                    }
                    if (classifier_type_id === 2) {
                      setClassificationField('category_id', data[item.index]['category_id']);
                      setClassificationField('problem_id', data[item.index]['problem_id']);
                    }
                  }
                }}
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
    </div>
  );
};

export default GraphicView;
