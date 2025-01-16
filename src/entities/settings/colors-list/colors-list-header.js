import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { ContentBox, Title } from '@/shared/ui';

const ColorsListHeader = ({ openCreateModal }) => {
  const t = useTranslations();
  return (
    <ContentBox className='w-full p-5 mb-5'>
      <div className='flex justify-between'>
        <Title>{t('Scale colors list')}</Title>
        <Button onClick={() => openCreateModal()}>{t('Create')}</Button>
      </div>
    </ContentBox>
  );
};

export default ColorsListHeader;
