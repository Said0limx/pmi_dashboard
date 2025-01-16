'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useTasksByCitizenAge } from '@/entities/dashboard/hooks';
import { ContentBox, Loader, LoadingOverlay, Title } from '@/shared/ui';

import { GenderCard } from './ui/gender-card';
import { NumberOfApplicants } from './ui/number-of-applicants';
import { RadarChart } from './ui/radar-chart';

export const DemographicViewOfApplicantsByAge = () => {
  const { data, isLoading, isFetching, isError, error } = useTasksByCitizenAge();

  const male = data?.[0];
  const female = data?.[1];
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
      className={'rounded-[1.25rem] overflow-hidden '}
      isLoading={!isLoading && isFetching}
    >
      <ContentBox className='p-5 h-full'>
        {isLoading && (
          <div className='min-h-[303px] h-full flex justify-center items-center'>
            <Loader />
          </div>
        )}

        {!isLoading && (
          <motion.div
            className='h-full'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Title>{t('Murojaat etuvchilarning yosh bo’yicha demografik ko’rinishi')}</Title>
            <div className='flex flex-col h-full xl:flex-row  items-center justify-around'>
              <div className='w-[55%] h-full max-h-96 flex justify-center'>
                <RadarChart male={male} female={female} />
              </div>
              <div className='flex justify-between xl:flex-col gap-5 w-full xl:w-auto'>
                <NumberOfApplicants appealsCount={male?.total_amount + female?.total_amount} />
                {data?.map((item) => {
                  return (
                    <GenderCard
                      key={item.gender}
                      genderType={item.gender}
                      title={item.title}
                      total_amount={item.total_amount}
                      percent={item.percentage}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </ContentBox>
    </LoadingOverlay>
  );
};
