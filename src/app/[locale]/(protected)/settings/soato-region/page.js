'use client';
import { useTranslations } from 'next-intl';

import { ContentBox, Title } from '@/shared/ui';
import { SoatoRegion } from '@/widgets/soato-region';

const Page = () => {
  const t = useTranslations();
  return (
    <div className='flex flex-col gap-5'>
      <ContentBox>
        <Title>
          <h1>{t('Regions')}</h1>
        </Title>
      </ContentBox>
      <ContentBox>
        <SoatoRegion />
      </ContentBox>
    </div>
  );
};

export default Page;
