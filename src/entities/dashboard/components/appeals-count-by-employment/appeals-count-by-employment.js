'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useTasksEmploymentType } from '@/entities/dashboard/hooks';
import { DonutChart, Loader, LoadingOverlay } from '@/shared/ui';
import { ContentBox } from '@/shared/ui/content-box';
import { Title } from '@/shared/ui/title';

import ChartLabels from '../../ui/chart-labels';

export const AppealsCountByEmployment = () => {
  const { data, isLoading, isFetching, isError, error } = useTasksEmploymentType();
  const t = useTranslations();

  if (isError) {
    return (
      <ContentBox>
        <div className='flex justify-center items-center h-full'>
          {error.response?.data.message || error.message}
        </div>
      </ContentBox>
    );
  }
  return (
    <LoadingOverlay
      className={'rounded-[1.25rem] overflow-hidden h-full  order-2 screen-1800:order-3'}
      isLoading={!isLoading && isFetching}
    >
      <ContentBox className='p-5 h-full min-h-[350px]'>
        {isLoading && (
          <div className='h-full flex justify-center items-center'>
            <Loader />
          </div>
        )}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Title size='lg'>{t('Mamlakatlar bo‘yicha loyihalar soni')}</Title>
            <div className='flex items-center gap-3 mt-4'>
              <DonutChart
                totalAmount={data?.headers.total_amount}
                data={data?.data.map((item) => ({
                  ...item,
                  amount: item.project_amount,
                }))}
                series={data?.data.map((item) => item.project_amount)}
              />
              <ChartLabels
                data={data?.data.map((item) => ({
                  ...item,
                  amount: item.project_amount,
                }))}
                chartLabelItemClass={'py-2'}
              />
            </div>
          </motion.div>
        )}
      </ContentBox>
    </LoadingOverlay>
  );
};
