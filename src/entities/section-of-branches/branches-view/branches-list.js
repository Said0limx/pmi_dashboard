'use client';
import { Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { useTasksBySphere } from '@/entities/dashboard/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';

import BranchCard from './branch-card';

export default function BranchesList() {
  const t = useTranslations();
  const { data = {} } = useTasksBySphere();

  const { setField, sphere_id, industry_id } = useFilterStore();

  const handleBack = () => {
    if (industry_id) {
      setField('industry_id', null);
    } else if (sphere_id) {
      setField('sphere_id', null);
    }
  };
  console.log('data', data);

  return (
    <div className='p-5 after:rounded-[1.25rem] rounded-[1.25rem] relative after:absolute after:inset-0 after:bg-content_box_bg dark:after:bg-main_blue_5 after:-z-10 shadow-[2px_3px_7.9px_1px_#0000000A]'>
      <div className='flex justify-between items-center pr-8'>
        <Title className='sticky top-0 p-5'>
          {data?.headers?.breadcrumbs?.length > 0
            ? data?.headers?.breadcrumbs?.map((item) => item.title).join('  /  ')
            : t('Sohalar bo‘yicha prognozlar')}
        </Title>
        {sphere_id && (
          <div
            onClick={handleBack}
            className={'flex items-center gap-2 border px-2 rounded-lg cursor-pointer h-[40px]'}
          >
            <IconArrowLeft />
            {t('Orqaga')}
          </div>
        )}
      </div>

      <div className='grid grid-cols-2 xl:grid-cols-2 1xl:grid-cols-4 gap-4 overflow-auto max-h-[385px] px-5 pb-5'>
        {data.data?.map((item) => (
          <BranchCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
