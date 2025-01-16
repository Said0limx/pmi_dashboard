'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePeriodYearsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const PeriodYearSelect = () => {
  const { periodFields } = useFilterStore();
  if (periodFields.period_type_id !== 1) return <Component />;
  return null;
};

const Component = () => {
  const { data = [], isFetched } = usePeriodYearsList({});
  const { periodFields, setPeriodField, reportViewFields } = useFilterStore();

  useEffect(() => {
    const currentYear = data?.find((item) => item.is_default);
    if (!periodFields.period_year_id && currentYear) {
      setPeriodField('period_year_id', currentYear?.id);
    }
  }, [isFetched]);

  useEffect(() => {
    if (
      periodFields.period_year_id &&
      periodFields.from_period_year_id &&
      reportViewFields.report_type_id === 1
    ) {
      setPeriodField(
        'period_year_id',
        periodFields.from_period_year_id === periodFields.period_year_id
          ? periodFields.period_year_id - 1
          : periodFields.period_year_id,
      );
    }
  }, []);

  const t = useTranslations();

  return (
    <Select
      label={t('Yil')}
      placeholder={t('Yil')}
      name='period_year_id'
      clearable={false}
      value={String(periodFields.period_year_id)}
      onChange={(value) => setPeriodField('period_year_id', value ? Number(value) : null)}
      data={enumsMapper(data, { labelKey: 'year' })}
    />
  );
};

export default PeriodYearSelect;
