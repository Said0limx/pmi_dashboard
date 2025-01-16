import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePeriodYearsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const FromPeriodYearSelect = () => {
  const { periodFields } = useFilterStore();
  if (periodFields.period_type_id !== 1) return <Component />;
  return null;
};

const Component = () => {
  const { data = [], isFetched } = usePeriodYearsList();
  const { setPeriodField, periodFields } = useFilterStore();

  useEffect(() => {
    const fromPeriodYearId = periodFields.from_period_year_id;
    setPeriodField(
      'from_period_year_id',
      fromPeriodYearId ? fromPeriodYearId : periodFields.period_year_id - 1,
    );
  }, [isFetched]);
  const t = useTranslations();
  return (
    <Select
      label={t('Yil')}
      placeholder={t('Yil')}
      clearable={false}
      name='from_period_year_id'
      data={enumsMapper(data, { labelKey: 'year' })}
      value={String(periodFields.from_period_year_id)}
      onChange={(value) => setPeriodField('from_period_year_id', value ? Number(value) : null)}
    />
  );
};

export default FromPeriodYearSelect;
