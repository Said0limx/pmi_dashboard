import { Badge } from '@mantine/core';
import CountUp from 'react-countup';

import { PercentBadge } from '@/shared/ui';

export const ChartLabelItem = ({
  label,
  percent,
  badgeColor = 'blue',
  number,
  withNumber = true,
  withPercent = true,
  chartLabelItemClass = 'py-[1.2rem]',
}) => {
  return (
    <div className={`w-full ${chartLabelItemClass}`}>
      <div className='flex items-start gap-1'>
        <Badge size={8} mih={8} miw={8} circle color={badgeColor} className='mt-[6px]' />
        <span className='text-[#707EAE] text-xs leading-5 dark:text-white font-medium'>
          {label}
        </span>
        {withPercent && <PercentBadge percent={percent} />}
      </div>
      {withNumber && (
        <p className='ml-3 text-lg leading-6 text-color font-bold'>
          <CountUp end={number} duration={2} separator=' ' />
        </p>
      )}
    </div>
  );
};
