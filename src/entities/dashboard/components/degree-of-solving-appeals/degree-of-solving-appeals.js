'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useTasksResultType } from '@/entities/dashboard/hooks';
import ChartLabels from '@/entities/dashboard/ui/chart-labels';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { ContentBox, DonutChart, Loader, LoadingOverlay, Title } from '@/shared/ui';

import { NumberOfAppeals } from '../dashboard-map/ui/appeals-count/appeals-count';
import SourceBarChartContainer from '../source-bar-chart';

export const DegreeOfSolvingAppeals = ({ isLabelsHide = false }) => {
  const { data, isLoading, isFetching, isError, error } = useTasksResultType();
  const t = useTranslations();
  const { setField } = useFilterStore();

  if (isError) {
    return (
      <ContentBox>
        <div className='flex justify-center items-center h-full'>
          {error.response?.data.message || error.message}
        </div>
      </ContentBox>
    );
  }

  const handleClick = (item) => {
    setField('source_id', item.id);
  };
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
            <Title size='lg'>{t('Moliyalashtirish manbalari bo‘yicha jami')}</Title>
            <div className='flex items-center gap-3 mt-4'>
              <DonutChart
                totalAmount={data.headers.total_fact_amount}
                data={data?.data.map((item) => ({
                  ...item,
                  amount: item.fact_amount,
                  percentage: item.fact_percentage,
                }))}
                countUpProps={{
                  decimals: 2,
                  prefix: '$',
                }}
              />
              {isLabelsHide ? (
                <div>
                  <SourceBarChartContainer />
                </div>
              ) : (
                <ChartLabels
                  data={data?.data}
                  withNumber={false}
                  withPercent={false}
                  chartLabelItemClass={'py-2'}
                  onClick={handleClick}
                />
              )}
            </div>
            {isLabelsHide && <NumberOfAppeals />}
          </motion.div>
        )}
      </ContentBox>
    </LoadingOverlay>
  );
};
