import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePeriodDaysList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const FromPeriodDaySelect = () => {
  const { periodFields } = useFilterStore();

  if (!(periodFields.period_type_id == 6)) {
    return null;
  }

  return <Component />;
};

const Component = () => {
  const { periodFields, setPeriodField } = useFilterStore();
  const { data = [], isFetched } = usePeriodDaysList({
    params: {
      period_month_id: periodFields.from_period_month_id,
      period_year_id: periodFields.from_period_year_id,
    },
  });

  useEffect(() => {
    const paramsPeriod = periodFields.from_period_day_id;
    setPeriodField('from_period_day_id', paramsPeriod ? paramsPeriod : periodFields.period_day_id);
  }, [data.length, isFetched]);
  const t = useTranslations();
  return (
    <Select
      label={t('Kun')}
      placeholder={t('Kun')}
      name='from_period_day_id'
      clearable={false}
      data={enumsMapper(data, { labelKey: 'day' })}
      value={String(periodFields.from_period_day_id)}
      onChange={(value) => setPeriodField('from_period_day_id', value ? Number(value) : null)}
    />
  );
};

export default FromPeriodDaySelect;
