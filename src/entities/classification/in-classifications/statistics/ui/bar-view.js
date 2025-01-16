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

import { useClassificationKey, useSetClassificationId, useStrokeColor } from '@/shared/hooks';
import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';
import usePagination from '@/shared/hooks/use-pagination/use-pagination';
import { Pagination } from '@/shared/ui';
import { CustomLegendRecharts } from '@/shared/ui/custom-legend-recharts';
import { CustomTooltipRecharts } from '@/shared/ui/custom-tooltip-recharts';
import { colors } from '@/shared/variables/colors';

const BarView = ({ data, headers, isLoading }) => {
  const { title, ...otherHeaderValues } = headers;
  const { handleClick } = useSetClassificationId();
  const { classifierKey } = useClassificationKey();
  const { territory } = useDetermineReportCategory();
  const key = classifierKey;
  const headersLength = Object.keys(otherHeaderValues || {}).length;
  const l = headersLength <= 1 ? 1.2 : headersLength;
  const { nextPage, pageCount, pageNumber, changePage, previousPage, start, end } = usePagination(
    data,
    20,
  );

  const slicedData = data.slice(start, end);

  const stroke = useStrokeColor();
  if (isLoading) {
    return null;
  }
  const containerHeight = slicedData.length * 33 * l;

  return (
    <div className='h-[87%] flex flex-col'>
      <div className='overflow-y-auto overflow-x-hidden'>
        <ResponsiveContainer
          height={(containerHeight > 100 ? containerHeight : 200) + 100}
          width='100%'
        >
          <BarChart barSize={25} layout='vertical' data={slicedData} barCategoryGap={10}>
            <Legend verticalAlign='top' content={<CustomLegendRecharts titlesObject={headers} />} />
            <CartesianGrid strokeDasharray={'3 3'} vertical={true} horizontal={true} />
            <YAxis
              type='category'
              dataKey={key}
              className='text-[15px] cursor-pointer'
              interval={0}
              tick={<CustomizedAxisTick />}
              stroke={stroke}
              onClick={(item) => {
                if (!territory) handleClick(data[item.index].id);
              }}
              width={300}
              textAnchor='end'
            />

            <XAxis type='number' stroke={stroke} />
            <Tooltip
              cursor={{ fill: '#172a93cc' }}
              content={<CustomTooltipRecharts titlesObject={headers} />}
            />
            {slicedData.map((item, index) => (
              <ReferenceArea
                key={item[key]}
                y1={item[key]}
                y2={item[key]}
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

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;
  const stroke = useStrokeColor();
  const splittedText = payload.value.split(' ');
  return (
    <g transform={`translate(${x},${y})`} strokeWidth={1} fill={stroke}>
      <text dy={5} textAnchor='end'>
        <title>{payload.value}</title>
        {splittedText.length > 3 ? `${splittedText.slice(0, 3).join(' ')}...` : payload.value}
      </text>
    </g>
  );
};

export default BarView;
