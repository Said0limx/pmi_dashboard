import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { ContentBox, Loader, LoadingOverlay, Title } from '@/shared/ui';
import { formatNumber } from '@/shared/utils';

import { useAbroadCountryList, useSourceBarChart } from '../../hooks';
import SourceBarChart from './source-bar-chart';

function SourceBarChartContainer() {
  const { data, isLoading, isFetching, isError, error } = useSourceBarChart();

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
    <div>
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
          <SourceBarChart data={data?.data} />
        </motion.div>
      )}
    </div>
  );
}

export default SourceBarChartContainer;
