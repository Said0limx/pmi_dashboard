'use client';
import { Button } from '@mantine/core';
import { useMounted } from '@mantine/hooks';
import { IconBackspace } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import OrderSelect from '@/entities/main-filter/components/fields/order-select';
import PeriodMonthSelect from '@/entities/main-filter/components/fields/period-month-select';
import PeriodSelect from '@/entities/main-filter/components/fields/period-select';
import PeriodTypeSelect from '@/entities/main-filter/components/fields/period-type-select';
import PeriodYearSelect from '@/entities/main-filter/components/fields/period-year-select';
import RegionsSelect from '@/entities/main-filter/components/fields/regions-select';
import { useFilterStore } from '@/shared/store/use-filter-store';

export const DashboardFilter = () => {
  const mounted = useMounted();
  const t = useTranslations();
  const {
    source_id,
    order_id,
    abroad_country_id,
    sphere_id,
    industry_id,
    authority_id,
    resetToInitialValues,
  } = useFilterStore();

  if (!mounted) {
    return null;
  }

  const isClearButtonVisible =
    source_id || order_id || abroad_country_id || sphere_id || industry_id || authority_id;

  return (
    <div className='sticky top-0 z-20 bg-white dark:bg-main_blue_5 p-5 rounded-lg'>
      <div className='grid grid-cols-6 gap-5 items-center'>
        <PeriodTypeSelect filterOptions={(data) => data.filter((item) => item.value != 1)} />
        <PeriodYearSelect />
        <OrderSelect />
        <PeriodSelect />
        <PeriodMonthSelect />
        <RegionsSelect />
        {isClearButtonVisible && (
          <Button
            size='sm'
            className='mt-6 bg-main_dark_blue w-[180px]'
            onClick={resetToInitialValues}
          >
            {t('Tozalash')}
          </Button>
        )}
      </div>
    </div>
  );
};
