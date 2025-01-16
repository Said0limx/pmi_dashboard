import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePeriodsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const PeriodSelect = () => {
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
  const { data = [], isFetched } = usePeriodsList();
  const { periodFields, setPeriodField } = useFilterStore();
  const t = useTranslations();
  useEffect(() => {
    if (data?.length) {
      const paramsPeriod = periodFields.period_id;
      const currentPeriod = data.find((item) => item.is_default);
      const hasParamsPeriodInData = data.find((item) => item?.id == paramsPeriod);
      if ((hasParamsPeriodInData && paramsPeriod) || currentPeriod)
        setPeriodField('period_id', hasParamsPeriodInData ? paramsPeriod : currentPeriod?.id);
      else {
        setPeriodField('period_id', data[0]?.id);
      }
    }
  }, [isFetched, data.length]);

  if (
    !(
      (periodFields.period_type_id == 4 || periodFields.period_type_id == 3) &&
      periodFields.period_year_id
    )
  ) {
    return null;
  }

  return (
    <Select
      label={t('Davr')}
      placeholder={t('Davr')}
      name='period_id'
      clearable={false}
      value={String(periodFields.period_id)}
      onChange={(value) => setPeriodField('period_id', value ? Number(value) : null)}
      data={enumsMapper(data)}
    />
  );
};

export default PeriodSelect;
