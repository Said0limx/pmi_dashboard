'use client';
import { IconArrowLeft } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useTasksBySource } from '@/entities/dashboard/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { ContentBox, Loader, LoadingOverlay, Title } from '@/shared/ui';

import Sources from './ui/sources';

export const NumberOfAppealsInSourceSection = () => {
  const { data, isLoading, isFetching, isError, error } = useTasksBySource();
  const t = useTranslations();

  const { setField, sphere_id, industry_id } = useFilterStore();

  const handleBack = () => {
    if (industry_id) {
      setField('industry_id', null);
    } else if (sphere_id) {
      setField('sphere_id', null);
    }
  };

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
            <div className='flex justify-between items-center pr-8'>
              <Title className='sticky top-0 p-5'>
                {data?.headers?.breadcrumbs?.title ?? t('Sohalar bo‘yicha prognozlar')}
              </Title>
              {sphere_id && (
                <div
                  onClick={handleBack}
                  className={
                    'flex items-center gap-2 border px-2 rounded-lg cursor-pointer h-[40px]'
                  }
                >
                  <IconArrowLeft />
                  {t('Orqaga')}
                </div>
              )}
            </div>
            <Sources data={data?.data} />
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
