import { Progress, Tooltip } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/utils';

import { ChartLabelItem } from './chart-label-item';

const ChartLabels = ({ data = [], withPercent, withNumber, chartLabelItemClass, onClick }) => {
  const t = useTranslations();
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
          <Tooltip label={`$${(item.fact_amount / 1000).toFixed(2)}${t('mlrd')}`}>
            <div
              className={classNames(
                'flex items-center gap-3 ml-3',
                data.length - 1 === index && 'mb-3',
              )}
            >
              <Progress
                value={+item.fact_percentage?.slice(0, 2)}
                className='w-full'
                color='indigo'
              />
              <span className='text-sm'>{item.fact_percentage}</span>
            </div>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export default ChartLabels;
