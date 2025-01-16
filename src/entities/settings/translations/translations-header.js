import { useTranslations } from 'next-intl';

import { ContentBox, Title } from '@/shared/ui';

import CreateTranslation from './create-translation';
import TranslateSyncLocal from './translate-sync-local';
import TranslateWriteLocal from './translate-write-to-local';
const TranslationsHeader = () => {
  const t = useTranslations();
  return (
    <ContentBox>
      <div className='flex items-center justify-between'>
        <Title>
          <h1>{t('Translations')}</h1>
        </Title>
        <div className='flex gap-2'>
          <TranslateSyncLocal />
          <TranslateWriteLocal />
          <CreateTranslation />
        </div>
      </div>
    </ContentBox>
  );
};

export default TranslationsHeader;
