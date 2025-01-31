'use client';
import { Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { useTasksBySphere } from '@/entities/dashboard/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { LoadingOverlay } from '@/shared/ui';

import BranchCard from './branch-card';

export default function BranchesList() {
  const t = useTranslations();
  const { data = {}, isLoading } = useTasksBySphere();

  const { setField, sphere_id, industry_id } = useFilterStore();

  const handleBack = () => {
    if (industry_id) {
      setField('industry_id', null);
    } else if (sphere_id) {
      setField('sphere_id', null);
    }
  };

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className='p-5 rounded-[20px] dark:bg-main_blue_5 h-full'>
        <div className='flex justify-between items-center pb-8'>
          <Title size={'lg'}>
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

        <div className='overflow-auto px-3 max-h-[310px] grid grid-cols-2 xl:grid-cols-2 1xl:grid-cols-4 gap-4'>
          {data.data?.map((item) => (
            <BranchCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </LoadingOverlay>
  );
}
