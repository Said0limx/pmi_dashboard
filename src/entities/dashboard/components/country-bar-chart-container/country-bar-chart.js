import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
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
import { useFilterStore } from '@/shared/store/use-filter-store';
import { CustomLegendRecharts, CustomTooltipRecharts } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

function CountryBarChart({ data }) {
  const stroke = useStrokeColor();

  const t = useTranslations();

  const { setField } = useFilterStore();

  const titlesObject = {
    self_project_amount: t('Yagona ishtirokchi sifatida'),
    partnership_project_amount: t('Hamishtirokchi sifatidagi'),
  };

  const handleClick = (el) => {
    if (el?.id) {
      setField('abroad_country_id', el.id);
    } else {
      toast.error(t('ID mavjud emas'));
    }
  };

  return (
    <ResponsiveContainer height={350}>
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
        <Tooltip
          content={
            <CustomTooltipRecharts
              titlesObject={titlesObject}
              colorList={[colors[4], colors[0]]}
              isLabelInPayload
            />
          }
        />
        <Legend
          content={
            <CustomLegendRecharts titlesObject={titlesObject} colorList={[colors[4], colors[0]]} />
          }
        />
        <Bar dataKey='self_project_amount' stackId='a' fill={colors[4]} onClick={handleClick} />
        <Bar
          dataKey='partnership_project_amount'
          stackId='a'
          fill={colors[0]}
          onClick={handleClick}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CountryBarChart;
