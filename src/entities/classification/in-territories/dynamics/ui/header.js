'use client';
import { useTranslations } from 'next-intl';

import { BackButtonForAreas, DetermineArea, Title } from '@/shared/ui';

const Header = () => {
  const t = useTranslations();
  return (
    <div className='flex items-center gap-2 justify-between'>
      <div className='flex items-center gap-2'>
        <BackButtonForAreas />
        <Title>{t('Hududlar dinamikasi')}</Title>
      </div>
      <DetermineArea />
    </div>
  );
};

export default Header;
