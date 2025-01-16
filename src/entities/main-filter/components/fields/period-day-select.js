import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePeriodDaysList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const PeriodDaySelect = () => {
  const { periodFields } = useFilterStore();

  if (!(periodFields.period_type_id == 6)) {
    return null;
  }

  return <Component />;
};

const Component = () => {
  const { data = [], isFetched } = usePeriodDaysList();
  const { periodFields, setPeriodField } = useFilterStore();

  const t = useTranslations();

  useEffect(() => {
    if (data?.length) {
      const paramsPeriod = periodFields.period_day_id;
      const currentPeriod = data.find((item) => item.is_default);
      const hasParamsPeriodInData = data.find((item) => item?.id == paramsPeriod);
      if ((hasParamsPeriodInData && paramsPeriod) || currentPeriod)
        setPeriodField('period_day_id', hasParamsPeriodInData ? paramsPeriod : currentPeriod?.id);
      else {
        setPeriodField('period_day_id', data[0]?.id);
      }
    }
  }, [isFetched, data.length]);

  return (
    <Select
      label={t('Kun')}
      placeholder={t('Kun')}
      name='period_day_id'
      clearable={false}
      data={enumsMapper(data, { labelKey: 'day' })}
      value={String(periodFields.period_day_id)}
      onChange={(value) => setPeriodField('period_day_id', value ? Number(value) : null)}
    />
  );
};

export default PeriodDaySelect;
