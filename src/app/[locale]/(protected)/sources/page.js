'use client';
import { useTranslations } from 'next-intl';

import { SourcesDynamics } from '@/entities/sources/source-dynamics';
import { SourcesStatistics } from '@/entities/sources/sources-statistics';
import { useDetermineReportType } from '@/shared/hooks';
import { DetermineArea, Title } from '@/shared/ui';
import { DetermineSource } from '@/shared/ui/determine-source';
import PageLayout from '@/widgets/layout/page-layout';

const Sources = () => {
  const { isStats, isDynamic } = useDetermineReportType();
  const t = useTranslations();

  return (
    <PageLayout>
      <div className='flex items-center justify-between'>
        <Title>{t('Manbalar kesimida')}</Title>
        <div className='flex gap-2'>
          <DetermineArea /> <DetermineSource />
        </div>
      </div>
      {isStats && <SourcesStatistics />}
      {isDynamic && <SourcesDynamics />}
    </PageLayout>
  );
};

export default Sources;
