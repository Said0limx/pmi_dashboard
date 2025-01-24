'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { ClassificationButton } from '@/entities/dashboard/components/dashboard-regions-bar/ui/classification-button';
import SectionRegionBarChart from '@/entities/dashboard/components/dashboard-regions-bar/ui/section-regions-bar-chart';
import { useDashboardAuthorityList } from '@/entities/dashboard/hooks';
import { ContentBox, Loader, LoadingOverlay, Title } from '@/shared/ui';

export const DashboardRegionsBar = () => {
  const t = useTranslations();
  const { data = {}, isLoading, isFetching, isError, error } = useDashboardAuthorityList();
  const dataTable = data?.data?.slice(0, 15) || [];
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
      <ContentBox className='p-5 relative h-[306px]'>
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
          >
            <div className='flex gap-2 items-center mb-2 justify-between'>
              <Title size='lg'>{t('Tashabbuskorlarning o‘zlashtirish foizi')}</Title>{' '}
              {/* <ClassificationButton /> */}
            </div>
            <SectionRegionBarChart data={dataTable} />
          </motion.div>
        )}
      </ContentBox>
    </LoadingOverlay>
  );
};
