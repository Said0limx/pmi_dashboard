import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { ContentBox, Loader, LoadingOverlay, Title } from '@/shared/ui';
import { formatNumber } from '@/shared/utils';

import { useAbroadCountryList } from '../../hooks';
import AuthorityBarChart from './authority-bar-chart';

function AuthorityBarChartContainer() {
  const { data, isLoading, isFetching, isError, error } = useAbroadCountryList();
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
            <Title size='lg' className='text-center'>
              {t('Mamlakatlar bo‘yicha loyihalar soni')}:{' '}
              <span className='text-xl'>{formatNumber(data?.headers?.total_amount)}</span>
            </Title>
            <AuthorityBarChart data={data?.data} />
          </motion.div>
        )}
      </ContentBox>
    </LoadingOverlay>
  );
}

export default AuthorityBarChartContainer;
