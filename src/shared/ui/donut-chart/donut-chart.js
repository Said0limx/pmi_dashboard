import { ArcElement, Chart, Tooltip } from 'chart.js';
import { useTranslations } from 'next-intl';
import { Doughnut } from 'react-chartjs-2';
import CountUp from 'react-countup';

Chart.register(ArcElement, Tooltip);

export const DonutChart = ({
  totalAmount,
  // percent,
  data = [],
  width = 250,
  height = 250,
  className = 'w-[250px] h-[250px] flex items-center',
  countUpProps = { separator: ' ' },
}) => {
  const t = useTranslations();

  if (!data.length) {
    return null;
  }
  const series = data.map(({ amount }) => amount);
  const colors = data.map(({ color }) => color || '#000');
  const labels = data.map(({ title }) => title);

  const totalAmountLength = totalAmount?.toString().length;
  const end =
    totalAmount > 1000 ? (totalAmount / 1000)?.toFixed(2) : Number(totalAmount).toFixed(2);

  return (
    <div className='relative'>
      <div className='absolute  w-full h-full flex-col flex items-center justify-center'>
        <p
          className={`${totalAmountLength >= 7 ? 'text-[32px] leading-[48px]' : 'text-[36px] leading-[58px]'}  tracking-tightest font-bold text-color`}
        >
          <CountUp
            duration={2}
            end={end}
            suffix={totalAmount > 1000 ? t('mlrd') : t('mln')}
            {...countUpProps}
          />
        </p>

        {/* <PercentBadge percent={percent} withBg /> */}
      </div>
      <div className={`${className} relative`}>
        <Doughnut
          width={width}
          height={height}
          options={{
            cutout: '80%',
            radius: '100%',
            plugins: {
              datalabels: {
                display: false,
              },
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const percent = data?.[context.dataIndex]?.percentage;
                    return percent;
                  },
                },
              },
            },
          }}
          data={{
            labels: labels,
            datasets: [
              {
                data: series,
                backgroundColor: colors,
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
