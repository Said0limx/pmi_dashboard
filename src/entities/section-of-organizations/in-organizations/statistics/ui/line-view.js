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

import { usePeriodMonthsList } from '@/shared/api-hooks/main-filter';
import { useStrokeColor } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { CustomLegendRecharts, CustomTooltipRecharts } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';
const LineView = ({ data, headers, isLoading }) => {
  const { data: months = [] } = usePeriodMonthsList();
  const monthObject = months.reduce((acc, el) => ({ ...acc, [el.id]: el.name }), {});
  const { periodFields } = useFilterStore();
  const stroke = useStrokeColor();

  const mappedData = data.map((el) => {
    return {
      ...el,
      period:
        periodFields.period_type_id === 1 || periodFields.period_type_id === 5
          ? el.period
          : monthObject[el.period],
    };
  });

  if (isLoading) {
    return null;
  }

  return (
    <ResponsiveContainer width='100%' height={670}>
      <LineChart data={mappedData}>
        <CartesianGrid strokeDasharray='3 3' stroke={stroke} />
        <XAxis dataKey='period' stroke={stroke} />
        <YAxis stroke={stroke} />
        <Tooltip content={<CustomTooltipRecharts titlesObject={headers.main_column_key} />} />
        <Legend
          verticalAlign='top'
          content={<CustomLegendRecharts titlesObject={headers.main_column_key} />}
        />
        {Object.keys(headers.main_column_key).map((key, index) => (
          <Line
            type='monotone'
            key={key}
            dataKey={key}
            strokeWidth={3}
            stroke={colors[index]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineView;
