import { useTranslations } from 'next-intl';

import FromPeriodDaySelect from '@/entities/main-filter/components/fields/from-period-day-select';
import FromPeriodMonthSelect from '@/entities/main-filter/components/fields/from-period-month-select';
import FromPeriodSelect from '@/entities/main-filter/components/fields/from-period-select';
import FromPeriodYearSelect from '@/entities/main-filter/components/fields/from-period-year-select';
import PeriodDaySelect from '@/entities/main-filter/components/fields/period-day-select';
import PeriodMonthSelect from '@/entities/main-filter/components/fields/period-month-select';
import PeriodSelect from '@/entities/main-filter/components/fields/period-select';
import PeriodTypeSelect from '@/entities/main-filter/components/fields/period-type-select';
import PeriodYearSelect from '@/entities/main-filter/components/fields/period-year-select';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Title } from '@/shared/ui';

export const PeriodFilterFields = () => {
  const {
    reportViewFields: { report_graphic_view_id, report_type_id },
    periodFields: { period_type_id },
  } = useFilterStore();
  const t = useTranslations();
  return (
    <>
      <PeriodTypeSelect
        filterOptions={
          report_graphic_view_id !== 1
            ? (data) => data.filter((item) => item.value != 6)
            : (data) => data.filter((item) => item.value != 1)
        }
      />
      {report_type_id == 2 && period_type_id !== 1 && (
        <>
          <PeriodYearSelect />
          <PeriodSelect />
          <PeriodMonthSelect />
          <PeriodDaySelect />
        </>
      )}
      {report_type_id == 1 && period_type_id !== 1 && (
        <>
          <Title>{t('1-davr')}</Title>
          <FromPeriodYearSelect />
          <FromPeriodSelect />
          <FromPeriodMonthSelect />
          <FromPeriodDaySelect />
        </>
      )}

      {report_type_id == 1 && period_type_id !== 1 && (
        <>
          <Title>{t('2-davr')}</Title>
          <PeriodYearSelect />
          <PeriodSelect />
          <PeriodMonthSelect />
          <PeriodDaySelect />
        </>
      )}
    </>
  );
};
