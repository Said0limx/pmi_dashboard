import { useTranslations } from 'next-intl';

import { useTasksAmount } from '@/entities/dashboard/hooks';
import { PercentBadge } from '@/shared/ui';
import { formatNumber, toFixed } from '@/shared/utils';

export const NumberOfAppeals = () => {
  const { data, isFetching } = useTasksAmount();
  const t = useTranslations();
  if (isFetching) {
    return null;
  }
  return (
    <div className={'flex items-center gap-2'}>
      <div
        className={
          'bg-white dark:bg-main-blue h-full rounded-lg p-4 flex flex-col items-center justify-center'
        }
      >
        <div className={'text-color text-xl font-semibold'}>{t('Jami soni')}</div>
        <div className={'text-4xl text-color font-bold text-center '}>
          {formatNumber(data?.total_amount || '')}
        </div>
        <PercentBadge percent={data?.percentage} />
      </div>
      <div className={'flex flex-col gap-2 flex-1'}>
        {data?.data?.map((item) => {
          return (
            <div
              key={item.id}
              className={
                'px-3 py-2 bg-white dark:bg-main-blue rounded-lg flex items-center justify-between'
              }
            >
              <div className={'text-color font-semibold'}>{item.title}</div>
              <div className={'flex items-center gap-2'}>
                <div className={'text-color text-2xl font-semibold'}>
                  {formatNumber(item.amount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
