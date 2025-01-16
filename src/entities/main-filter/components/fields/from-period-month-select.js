import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePeriodMonthsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const FromPeriodMonthSelect = () => {
  const { periodFields } = useFilterStore();

  if (!(periodFields.period_type_id == 5 || periodFields.period_type_id == 6)) {
    return null;
  }
  return <Component />;
};

const Component = () => {
  const { periodFields, setPeriodField } = useFilterStore();
  const { data = [], isFetched } = usePeriodMonthsList({
    params: {
      period_year_id: periodFields.from_period_year_id,
    },
  });

  useEffect(() => {
    const paramsPeriod = periodFields.from_period_month_id;
    setPeriodField(
      'from_period_month_id',
      paramsPeriod ? paramsPeriod : periodFields.period_month_id,
    );
  }, [data.length, isFetched]);
  const t = useTranslations();
  return (
    <Select
      label={t('Oy')}
      placeholder={t('Oy')}
      name='from_period_month_id'
      data={enumsMapper(data)}
      clearable={false}
      value={String(periodFields.period_month_id)}
      onChange={(value) => setPeriodField('from_period_month_id', value ? Number(value) : null)}
    />
  );
};

export default FromPeriodMonthSelect;
