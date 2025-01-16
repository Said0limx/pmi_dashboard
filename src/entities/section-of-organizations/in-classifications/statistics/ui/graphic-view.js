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
import { CustomLegendRecharts, Pagination } from '@/shared/ui';
import { CustomTooltipRecharts } from '@/shared/ui/custom-tooltip-recharts';
import { colors } from '@/shared/variables/colors';

const GraphicView = ({ data, headers }) => {
  const { nextPage, pageCount, pageNumber, changePage, previousPage, start, end } = usePagination(
    data,
    20,
  );
  const slicedData = data.slice(start, end);
  const headersLength = Object.keys(headers.main_column_key).length;
  const l = headersLength <= 1 ? 1.2 : headersLength;
  const stroke = useStrokeColor();

  const { classifierKey } = useClassificationKey();

  const {
    classificationFields: { classifier_type_id },
    setClassificationField,
  } = useFilterStore();
  return (
    <>
      <div className='overflow-y-auto overflow-x-hidden max-h-[85%]'>
        <ResponsiveContainer width='100%' height={slicedData.length * 33 * l + 100}>
          <BarChart barSize={25} layout='vertical' data={slicedData} barCategoryGap={10}>
            <CartesianGrid strokeDasharray='3 3' stroke={stroke} />
            <YAxis
              type='category'
              dataKey='title'
              className='text-[15px] cursor-pointer'
              width={500}
              interval={0}
              stroke={stroke}
              textAnchor='end'
              onClick={(item) => {
                const { id, category_id } = headers[classifierKey][item.index];
                if (classifier_type_id === 1) {
                  setClassificationField('category_id', id);
                } else if (classifier_type_id === 2) {
                  if (category_id) {
                    setClassificationField('category_id', category_id);
                  }
                  setClassificationField('problem_id', id);
                }
              }}
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
      <div className='mt-5'>
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
