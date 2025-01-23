import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useStrokeColor } from '@/shared/hooks';
import { CustomLegendRecharts, CustomTooltipRecharts } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

const LineView = ({ data, headers, isLoading }) => {
  const stroke = useStrokeColor();

  const monthObject = headers?.reduce((acc, el) => ({ ...acc, [el.value]: el.title }), {});
  const mappedData = data?.map((el) => {
    return {
      ...el,
      period: monthObject[el.period],
      plan_amount: +el.plan_amount,
      fact_amount: +el.fact_amount,
    };
  });

  if (isLoading) {
    return null;
  }

  return (
    <ResponsiveContainer height={300}>
      <LineChart data={mappedData}>
        <CartesianGrid strokeDasharray='3 3' stroke={stroke} />
        <XAxis dataKey='period' stroke={stroke} />
        <YAxis stroke={stroke} />
        <Tooltip
          content={
            <CustomTooltipRecharts
              title={'Summa'}
              titlesObject={{
                plan_amount: 'План',
                fact_amount: 'Факт',
              }}
            />
          }
        />
        <Legend
          verticalAlign='top'
          content={
            <CustomLegendRecharts
              titlesObject={{
                plan_amount: 'План',
                fact_amount: 'Факт',
              }}
            />
          }
        />
        <Line
          type='monotone'
          dataKey='plan_amount'
          strokeWidth={3}
          stroke={colors[0]}
          activeDot={{ r: 8 }}
        />
        <Line
          type='monotone'
          dataKey='fact_amount'
          strokeWidth={3}
          stroke={colors[1]}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineView;
