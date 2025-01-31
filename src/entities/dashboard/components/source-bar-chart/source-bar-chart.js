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

function SourceBarChart({ data }) {
  const stroke = useStrokeColor();

  const t = useTranslations();

  const { setField } = useFilterStore();

  let titlesObject = {};

  const handleClick = (el) => {
    if (el?.id) {
      setField('abroad_country_id', el.id);
    } else {
      toast.error(t('ID mavjud emas'));
    }
  };

  let finalData = [];

  if (data.length > 0) {
    finalData = [
      {
        first_plan: data[0].plan_amount,
        second_plan: data[1].plan_amount,
        code_name: t('Reja'),
      },
      {
        first_plan: data[0].fact_amount,
        second_plan: data[1].fact_amount,
        code_name: t('Fakt'),
      },
    ];

    titlesObject = {
      first_plan: data[0].title,
      second_plan: data[1].title,
    };
  }

  return (
    <ResponsiveContainer height={300} width={500}>
      <BarChart
        data={finalData}
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
              isLabelInPayload
              titlesObject={titlesObject}
              colorList={[colors[4], colors[0]]}
            />
          }
        />
        <Legend
          content={
            <CustomLegendRecharts titlesObject={titlesObject} colorList={[colors[4], colors[0]]} />
          }
        />
        <Bar
          barSize={100}
          dataKey='first_plan'
          stackId='a'
          fill={colors[4]}
          onClick={handleClick}
        />
        <Bar
          barSize={100}
          dataKey='second_plan'
          stackId='a'
          fill={colors[0]}
          onClick={handleClick}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SourceBarChart;
