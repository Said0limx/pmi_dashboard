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
import useAreaKeyForTerritory from '@/shared/hooks/use-area-key-for-territory';
import usePagination from '@/shared/hooks/use-pagination/use-pagination';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Pagination } from '@/shared/ui';
import { CustomLegendRecharts } from '@/shared/ui/custom-legend-recharts';
import { CustomTooltipRecharts } from '@/shared/ui/custom-tooltip-recharts';
import { colors } from '@/shared/variables/colors';

const GraphicView = ({ data, headers, isLoading }) => {
  const { main_column_key } = headers;

  const headersLength = Object.keys(main_column_key || {}).length;
  const l = headersLength <= 1 ? 1.2 : headersLength;
  const stroke = useStrokeColor();
  const { nextPage, pageCount, pageNumber, changePage, previousPage, start, end } = usePagination(
    data,
    20,
  );
  const areaKey = useAreaKeyForTerritory();
  const slicedData = data.slice(start, end);
  const slicedHeader = headers?.[areaKey]?.slice(start, end);
  const {
    setAreaField,
    areaFields: { territory_type_id },
  } = useFilterStore();

  if (isLoading) {
    return null;
  }

  return (
    <div className='h-full'>
      <div className='max-h-[85%] overflow-y-auto overflow-x-hidden mt-5'>
        <ResponsiveContainer height={slicedData.length * 33 * l + 100} width='100%'>
          <BarChart barSize={25} layout='vertical' data={slicedData} barCategoryGap={10}>
            <Legend
              verticalAlign='top'
              content={<CustomLegendRecharts titlesObject={main_column_key} />}
            />
            <CartesianGrid strokeDasharray={'3 3'} vertical={true} horizontal={true} />
            <YAxis
              type='category'
              dataKey='title'
              className='text-[15px] cursor-pointer'
              interval={0}
              stroke={stroke}
              width={160}
              textAnchor='end'
              onClick={(item) => {
                const { id, region_id } = slicedHeader[item.index];

                if (territory_type_id === 1) {
                  setAreaField('region_id', id);
                } else if (territory_type_id === 2) {
                  if (region_id) {
                    setAreaField('region_id', region_id);
                  }
                  setAreaField('district_id', id);
                }
              }}
            />

            <XAxis type='number' stroke={stroke} />
            <Tooltip
              cursor={{ fill: '#172a93cc' }}
              content={<CustomTooltipRecharts titlesObject={main_column_key} />}
            />
            {slicedData.map((item) => (
              <ReferenceArea
                key={item.id}
                y1={item.title}
                y2={item.title}
                stroke='#f2f2f2'
                fill='transparent'
                strokeOpacity={1}
                strokeDasharray={'3 3'}
              />
            ))}
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
            {Object.keys(main_column_key).map((key, index) => (
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
      <div className='mt-5'>
        <Pagination
          pageCount={pageCount}
          changePage={changePage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};

export default GraphicView;
