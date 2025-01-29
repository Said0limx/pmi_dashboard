import { Progress } from '@mantine/core';

import { useFormatSum } from '@/shared/hooks';
import { classNames } from '@/shared/utils';

import { ChartLabelItem } from './chart-label-item';

const ChartLabels = ({ data = [], withPercent, withNumber, chartLabelItemClass, onClick }) => {
  const { formatSum } = useFormatSum();
  return (
    <div className='bg-white dark:bg-[#32419B] px-4 rounded-2xl max-h-[260px] overflow-y-auto flex-1 h-max relative shadow-[0px_10px_10px_0px_#7090B01F]'>
      {data.map((item, index) => (
        <div key={index} onClick={() => onClick(item)} className='cursor-pointer'>
          <ChartLabelItem
            badgeColor={item.color}
            number={item.amount}
            label={item.title}
            percent={item.percentage}
            withNumber={withNumber}
            withPercent={withPercent}
            chartLabelItemClass={chartLabelItemClass}
          />
          <div
            className={classNames(
              'flex items-center gap-3 ml-3',
              data.length - 1 === index && 'mb-3',
            )}
          >
            <Progress.Root size='xl' className='w-full'>
              <Progress.Section
                color='indigo'
                value={+item.fact_percentage?.slice(0, 2)}
              ></Progress.Section>
              <Progress.Section value={100 - +item.fact_percentage?.slice(0, 2)} color='gray'>
                <Progress.Label>
                  {item.fact_percentage} - {formatSum(item, '', '', 'fact_amount', true)}
                </Progress.Label>
              </Progress.Section>
            </Progress.Root>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartLabels;
