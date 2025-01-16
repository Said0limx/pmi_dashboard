import { useTranslations } from 'next-intl';

import { ContentBox, Title } from '@/shared/ui';

export const ScaleColorSettingsHeader = () => {
  const t = useTranslations();
  return (
    <ContentBox className='w-full p-5 mb-5'>
      <div className='flex justify-between'>
        <Title>{t('Scale color settings')}</Title>
      </div>
    </ContentBox>
  );
};
