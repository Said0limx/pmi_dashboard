import { useTranslations } from 'next-intl';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useStrokeColor } from '@/shared/hooks';
import { CustomLegendRecharts, CustomTooltipRecharts } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

function AuthorityBarChart({ data }) {
  const stroke = useStrokeColor();

  console.log(data);

  const t = useTranslations();

  const titlesObject = {
    self_project_amount: t('Yagona ishtirokchi sifatida'),
    partnership_project_amount: t('Hamishtirokchi sifatidagi'),
  };

  return (
    <ResponsiveContainer height={300}>
      <BarChart
        data={data?.slice(0, 20)}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' stroke={stroke} />
        <XAxis dataKey='code_name' stroke={stroke} />
        <YAxis stroke={stroke} />
        <Tooltip content={<CustomTooltipRecharts titlesObject={titlesObject} />} />
        <Legend content={<CustomLegendRecharts titlesObject={titlesObject} />} />
        <Bar dataKey='self_project_amount' stackId='a' fill={colors[4]} />
        <Bar dataKey='partnership_project_amount' stackId='a' fill={colors[0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AuthorityBarChart;
