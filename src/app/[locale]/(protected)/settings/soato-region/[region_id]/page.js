'use client';
import { Button } from '@mantine/core';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { ContentBox, Title } from '@/shared/ui';
import { SoatoRegion } from '@/widgets/soato-region';

const Page = () => {
  const t = useTranslations();
  return (
    <div className='flex flex-col gap-5'>
      <ContentBox>
        <div className='flex gap-4 items-center'>
          <Link href={`/settings/soato-region`}>
            <Button leftSection={<IconArrowNarrowLeft />} variant='outline'>
              {t('Orqaga')}
            </Button>
          </Link>
          <Title>
            <h1>{t('Districts')}</h1>
          </Title>
        </div>
      </ContentBox>
      <ContentBox>
        <SoatoRegion />
      </ContentBox>
    </div>
  );
};

export default Page;
