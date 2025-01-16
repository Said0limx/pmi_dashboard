'use client';
import { Button } from '@mantine/core';
import { IconSquareArrowLeft } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { NumberOfAppeals } from '@/entities/dashboard/components/dashboard-map/ui/appeals-count/appeals-count';
import { useTasksByRegionMap } from '@/entities/dashboard/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { ContentBox, Loader, LoadingOverlay, Title } from '@/shared/ui';

import UzbekistanMap from './ui/uzbekistan-map';

export const DashboardMap = () => {
  const { data = {}, isLoading, isFetching, isError, error } = useTasksByRegionMap();
  const { areaFields, setAreaField } = useFilterStore();
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
      className={'rounded-[1.25rem] overflow-hidden h-full flex-1'}
      isLoading={!isLoading && isFetching}
    >
      <ContentBox className='p-5 h-full flex-1'>
        {isLoading && (
          <div className='min-h-[303px] h-full flex justify-center items-center'>
            <Loader />
          </div>
        )}
        {!isLoading && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            className='flex justify-between flex-col h-full'
          >
            <div>
              <div className='flex justify-between'>
                <div>
                  {areaFields.region_id && (
                    <Button
                      leftSection={<IconSquareArrowLeft stroke={2} />}
                      onClick={() => setAreaField('region_id', '')}
                      variant='gradient'
                    >
                      {t('Ortga qaytish')}
                    </Button>
                  )}
                </div>
                <div>
                  <Title size='2xl'>{data?.title || t('O‘zbekiston Respublikasi')}</Title>
                </div>
              </div>
              <div className='flex justify-center mt-5'>
                <UzbekistanMap data={data.right?.filter((el) => el.id != 9999)} />
              </div>
            </div>
            <NumberOfAppeals />
          </motion.div>
        )}
      </ContentBox>
    </LoadingOverlay>
  );
};
