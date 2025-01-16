'use client';
import { useMounted } from '@mantine/hooks';

import PeriodDaySelect from '@/entities/main-filter/components/fields/period-day-select';
import PeriodMonthSelect from '@/entities/main-filter/components/fields/period-month-select';
import PeriodSelect from '@/entities/main-filter/components/fields/period-select';
import PeriodTypeSelect from '@/entities/main-filter/components/fields/period-type-select';
import PeriodYearSelect from '@/entities/main-filter/components/fields/period-year-select';
import RegionsSelect from '@/entities/main-filter/components/fields/regions-select';

export const DashboardFilter = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }
  return (
    <div className='sticky top-0 z-20 bg-white dark:bg-main_blue_5 p-5 rounded-lg'>
      <div className='grid grid-cols-6 gap-5'>
        <PeriodTypeSelect filterOptions={(data) => data.filter((item) => item.value != 1)} />
        <PeriodYearSelect />
        <PeriodSelect />
        <PeriodMonthSelect />
        <PeriodDaySelect />
        <RegionsSelect />
      </div>
    </div>
  );
};
