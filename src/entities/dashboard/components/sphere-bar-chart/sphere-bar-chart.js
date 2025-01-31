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

function SphereBarChart({ data }) {
  const stroke = useStrokeColor();

  const t = useTranslations();

  const { setField } = useFilterStore();

  const titlesObject = {
    plan_amount: t('Reja'),
    fact_amount: t('Fakt'),
  };

  const handleClick = (el) => {
    if (el?.id) {
      setField('sphere_id', el.id);
    } else {
      toast.error(t('ID mavjud emas'));
    }
  };

  return (
    <ResponsiveContainer height={'100%'}>
      <BarChart
        data={data}
        margin={{
          top: 15,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' stroke={stroke} />
        <XAxis dataKey='title' stroke={stroke} angle={-15} textAnchor='end' height={70} />
        <YAxis domain={['auto', 'auto']} stroke={stroke} />
        <Tooltip
          content={
            <CustomTooltipRecharts
              titlesObject={titlesObject}
              colorList={[colors[4], colors[0]]}
              isLabelInPayload
              isFormatted
            />
          }
          cursor={{ fill: '#fff', opacity: 0.1 }}
          contentStyle={{ color: '#000' }}
        />
        <Legend
          content={
            <CustomLegendRecharts titlesObject={titlesObject} colorList={[colors[4], colors[0]]} />
          }
        />
        <Bar dataKey='plan_amount' name={'plan_amount'} fill={colors[4]} onClick={handleClick} />
        <Bar dataKey='fact_amount' name={'fact_amount'} fill={colors[0]} onClick={handleClick} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SphereBarChart;
