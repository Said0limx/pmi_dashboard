'use client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslations } from 'next-intl';
import CountUp from 'react-countup';

import { useFormatNum } from '@/shared/hooks';

function generateOptions(data, totalAmount, t, stroke, formatNum, handleClick) {
  return {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 250,
      custom: {},
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },

    tooltip: {
      // useHTML: true,
      formatter: function () {
        return `${this.point.name}: ${formatNum(this.y)}`;
      },
    },
    legend: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
        depth: 50,
        dataLabels: {
          enabled: false,
          // useHTML: true,
          formatter: function () {
            return `${this.point.name}: ${formatNum(this.y)}`;
          },

          style: {
            color: stroke,
            fontWeight: 'bold',
            textOutline: 'none',
            fontSize: '14px',
          },
          // distance: -30,
        },
      },
    },
    series: [
      {
        name: 'Registrations',
        colorByPoint: true,
        innerSize: '75%',
        data: data.map((item) => ({
          id: item.id,
          name: item.title,
          y: Number(item.fact_amount),
        })),
      },
    ],
  };
}
const SourceDonut = ({ totalAmount, data = [], countUpProps }) => {
  const t = useTranslations();
  const { formatNum } = useFormatNum();

  if (!data.length) {
    return null;
  }

  const end =
    totalAmount > 1000 ? (totalAmount / 1000)?.toFixed(2) : Number(totalAmount).toFixed(2);

  return (
    <div className='relative'>
      <div className='absolute  w-full h-full flex-col flex items-center justify-center'>
        <p className={`text-[20px] tracking-tightest font-bold text-color`}>
          <CountUp
            duration={2}
            end={end}
            suffix={totalAmount > 1000 ? t('mlrd') : t('mln')}
            {...countUpProps}
          />
        </p>
      </div>
      <div className={`w-[250px] h-[250px] flex items-center relative`}>
        <HighchartsReact
          highcharts={Highcharts}
          options={generateOptions(data, totalAmount, t, undefined, formatNum, () => {})}
        />
      </div>
    </div>
  );
};

export default SourceDonut;
