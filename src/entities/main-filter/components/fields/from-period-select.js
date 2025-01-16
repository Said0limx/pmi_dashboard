import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePeriodsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const FromPeriodSelect = () => {
  const { periodFields } = useFilterStore();

  if (
    !(
      (periodFields.period_type_id == 4 || periodFields.period_type_id == 3) &&
      periodFields.period_year_id
    )
  ) {
    return null;
  }
  return <Component />;
};

const Component = () => {
  const { setPeriodField, periodFields } = useFilterStore();
  const { data = [], isFetched } = usePeriodsList({
    params: {
      period_year_id: periodFields.from_period_year_id,
    },
  });

  useEffect(() => {
    const paramsPeriod = periodFields.from_period_id;
    setPeriodField('from_period_id', paramsPeriod ? paramsPeriod : periodFields.period_id);
  }, [data.length, isFetched]);

  const t = useTranslations();
  return (
    <Select
      label={t('Davr')}
      placeholder={t('Davr')}
      name='from_period_id'
      clearable={false}
      data={enumsMapper(data)}
      value={String(periodFields.from_period_id)}
      onChange={(value) => setPeriodField('from_period_id', value ? Number(value) : null)}
    />
  );
};

export default FromPeriodSelect;
