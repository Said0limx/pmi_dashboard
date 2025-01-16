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
  const { title, district, region, ...otherHeaderValues } = headers;

  const headersLength = Object.keys(otherHeaderValues || {}).length;
  const l = headersLength <= 1 ? 1.2 : headersLength;
  const stroke = useStrokeColor();
  const { nextPage, pageCount, pageNumber, changePage, previousPage, start, end } = usePagination(
    data,
    20,
  );

  const slicedData = data.slice(start, end);
  const areaKey = useAreaKeyForTerritory();
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
              content={<CustomLegendRecharts titlesObject={otherHeaderValues} />}
            />
            <CartesianGrid strokeDasharray={'3 3'} vertical={true} horizontal={true} />
            <YAxis
              type='category'
              dataKey={areaKey}
              className='text-[15px] cursor-pointer'
              interval={0}
              stroke={stroke}
              width={160}
              textAnchor='end'
              onClick={(item) => {
                const { id, region_id } = slicedData[item.index];

                if (territory_type_id === 1) {
                  setAreaField('region_id', id);
                }
                if (territory_type_id === 2) {
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
              content={<CustomTooltipRecharts titlesObject={otherHeaderValues} />}
            />
            {slicedData.map((item, index) => (
              <ReferenceArea
                key={index}
                y1={item[areaKey]}
                y2={item[areaKey]}
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
            {Object.keys(otherHeaderValues || {}).map((key, index) => (
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
