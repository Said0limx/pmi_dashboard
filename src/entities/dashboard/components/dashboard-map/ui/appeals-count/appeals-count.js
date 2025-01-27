import { useTranslations } from 'next-intl';

import { useTasksAmount } from '@/entities/dashboard/hooks';
import { useFormatSum } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';

export const NumberOfAppeals = () => {
  const { data, isFetching } = useTasksAmount();
  const t = useTranslations();
  const { formatSum } = useFormatSum();

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
        <div className={'text-color text-xl font-semibold'}>{t('Loyihalar soni')}</div>
        <div className={'text-4xl text-color font-bold text-center '}>
          {formatNumber(data?.headers?.total_project_amount || '')}
        </div>
      </div>
      <div
        className={
          'bg-white dark:bg-main-blue h-full rounded-lg p-4 flex flex-col items-center justify-center'
        }
      >
        <div className={'text-color text-xl font-semibold'}>{t('Prognoz')}</div>
        <div className={'text-4xl text-color font-bold text-center '}>
          {formatSum(data?.headers, 'total_year_amount', 'total_plan_amount')}
        </div>
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
                  {formatNumber(item.project_amount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
