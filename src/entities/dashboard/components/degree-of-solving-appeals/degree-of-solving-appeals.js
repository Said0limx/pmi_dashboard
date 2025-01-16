'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useTasksResultType } from '@/entities/dashboard/hooks';
import ChartLabels from '@/entities/dashboard/ui/chart-labels';
import { ContentBox, DonutChart, Loader, LoadingOverlay, Title } from '@/shared/ui';

export const DegreeOfSolvingAppeals = () => {
  const { data, isLoading, isFetching, isError, error } = useTasksResultType();
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
      className={'rounded-[1.25rem] overflow-hidden h-full'}
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
            className='flex flex-col justify-between h-ull'
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
            <Title size='lg'> {t('Murojaatlarning hal etish darajasi')} </Title>
            <div className='flex items-center gap-3 mt-4'>
              <DonutChart
                totalAmount={data?.total_amount}
                percent={data?.percentage}
                data={data?.data}
              />
              <ChartLabels
                data={data?.data}
                withNumber={false}
                withPercent={false}
                chartLabelItemClass={'py-4'}
              />
            </div>
          </motion.div>
        )}
      </ContentBox>
    </LoadingOverlay>
  );
};
