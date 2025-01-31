import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { ContentBox, Loader, LoadingOverlay, Title } from '@/shared/ui';

import { useSphereList } from '../../hooks';
import SphereBarChart from './sphere-bar-chart';

function SphereBarChartContainer() {
  const { data, isLoading, isFetching, isError, error } = useSphereList();
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
      <ContentBox className='p-5  h-full '>
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
              {t('Tarmoqlar')}
            </Title>
            <SphereBarChart data={data?.data} />
          </motion.div>
        )}
      </ContentBox>
    </LoadingOverlay>
  );
}

export default SphereBarChartContainer;
