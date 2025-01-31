'use client';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

import { DashboardFilter } from '@/entities/dashboard/components/dashboard-filter/dashboard-filter';
import { DrawerAdditionalFilters } from '@/entities/main-filter/components/drawer-additional-filters';

import { Avatar, DarkModeSwitcher } from './ui';
import LanguageSwitcher from './ui/language-switcher';
import UserDetail from './ui/user-detail';

const Header = () => {
  const pathname = usePathname();
  const pageTitleKey = pathname.split('/')[2];

  const t = useTranslations();

  return (
    <div className='w-full flex justify-between items-center'>
      {/* <h1 className='text-color text-[2.125rem] font-bold leading-[2.625rem]'>
        {pageTitleKey ? t(pageTitleKey) : t('main_dashboard')}
      </h1> */}
      <DashboardFilter />
      <div className='flex justify-between gap-3'>
        <UserDetail />
        <LanguageSwitcher />
        <DrawerAdditionalFilters />
        <DarkModeSwitcher />
        <Avatar />
      </div>
    </div>
  );
};
export default memo(Header);
