import { useTranslations } from 'next-intl';

import { ContentBox, Title } from '@/shared/ui';

const SourceListHeader = () => {
  const t = useTranslations();
  return (
    <ContentBox className='w-full p-5 mb-5'>
      <div className='flex justify-between'>
        <Title>{t('Source list')}</Title>
      </div>
    </ContentBox>
  );
};

export default SourceListHeader;
