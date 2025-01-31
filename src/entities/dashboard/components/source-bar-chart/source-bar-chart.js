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

import { UpIcon } from '@/assets/icons';
import { useStrokeColor } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { CustomLegendRecharts, CustomTooltipRecharts } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

function SourceBarChart({ data }) {
  const stroke = useStrokeColor();
  console.log('data', data);

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
    <div className='relative'>
      <ResponsiveContainer height={300} width={500}>
        <BarChart
          data={finalData}
          margin={{
            top: 20,
            right: 70,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke={stroke} />
          <XAxis dataKey='code_name' stroke={stroke} />
          <YAxis stroke={stroke} />
          <Tooltip
            cursor={{ fill: '#fff', opacity: 0.1 }}
            content={
              <CustomTooltipRecharts
                isLabelInPayload
                titlesObject={titlesObject}
                colorList={['#41bbfa', '#9747ff']}
              />
            }
          />
          <Legend
            content={
              <CustomLegendRecharts
                titlesObject={titlesObject}
                colorList={['#41bbfa', '#9747ff']}
              />
            }
          />
          <Bar
            barSize={100}
            dataKey='first_plan'
            stackId='a'
            fill={'#41bbfa'}
            onClick={handleClick}
          />
          <Bar
            barSize={100}
            dataKey='second_plan'
            stackId='a'
            fill={'#9747ff'}
            onClick={handleClick}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className='absolute right-0 top-[25%]'>
        {data?.map((item, index) => (
          <div key={index}>
            <div className='flex flex-col items-center'>
              <div
                style={{
                  color: index === 0 ? '#9747ff' : '#41bbfa',
                  rotate: Number(item?.fact_percentage) > 0 ? '' : '180deg',
                }}
              >
                <UpIcon />
              </div>
              <div
                className='text-sm'
                style={{
                  color: Number(item?.fact_percentage) > 0 ? '#05cd99' : '#ff0000',
                }}
              >
                {`${item?.fact_percentage} %`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SourceBarChart;
