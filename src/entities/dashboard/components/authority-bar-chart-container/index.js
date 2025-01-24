'use client';
import { Legend, Tooltip } from 'chart.js';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Bar } from 'react-chartjs-2';
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { ContentBox, Loader, LoadingOverlay, Title } from '@/shared/ui';

import { useTasksEmploymentType } from '../../hooks';
import AuthorityBarChart from './authority-bar-chart';

function AuthorityBarChartContainer() {
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
            <AuthorityBarChart />
          </motion.div>
        )}
      </ContentBox>
    </LoadingOverlay>
  );
}

export default AuthorityBarChartContainer;
