'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useTasksBySource } from '@/entities/dashboard/hooks';
import { ContentBox, Loader, LoadingOverlay, Title } from '@/shared/ui';

import Sources from './ui/sources';

export const NumberOfAppealsInSourceSection = () => {
  const { data, isLoading, isFetching, isError, error } = useTasksBySource();
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
      className={'rounded-[1.25rem] overflow-hidden'}
      isLoading={!isLoading && isFetching}
    >
      <ContentBox className='p-0 rounded-b-xl h-full'>
        {isLoading && (
          <div className='min-h-[303px] h-full flex justify-center items-center'>
            <Loader />
          </div>
        )}
        {!isLoading && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
            <Title className='sticky top-0 p-5'>{t('Sohalar bo‘yicha prognozlar')}</Title>
            <Sources data={data} />
          </motion.div>
        )}

        <div
          className='bottom-0 left-0 w-full h-[55px] absolute dark:hidden'
          style={{
            background: 'linear-gradient(180deg, rgba(243, 247, 253, 0.00) 0%, #F2F6FE 89.45%)',
          }}
        />
      </ContentBox>
    </LoadingOverlay>
  );
};
