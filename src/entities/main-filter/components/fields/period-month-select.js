import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePeriodMonthsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const PeriodMonthSelect = () => {
  const { periodFields } = useFilterStore();

  if (!(periodFields.period_type_id == 5 || periodFields.period_type_id == 6)) {
    return null;
  }
  return <Component />;
};

const Component = () => {
  const { data = [], isFetched } = usePeriodMonthsList();
  const { periodFields, setPeriodField } = useFilterStore();
  const t = useTranslations();

  useEffect(() => {
    if (data?.length) {
      const paramsPeriod = periodFields.period_month_id;
      const currentPeriod = data.find((item) => item.is_default);
      const hasParamsPeriodInData = data.find((item) => item?.id == paramsPeriod);
      if ((hasParamsPeriodInData && paramsPeriod) || currentPeriod)
        setPeriodField('period_month_id', hasParamsPeriodInData ? paramsPeriod : currentPeriod?.id);
      else {
        setPeriodField('period_month_id', data[0]?.id);
      }
    }
  }, [isFetched, data.length]);

  return (
    <Select
      label={t('Oy')}
      placeholder={t('Oy')}
      name='period_month_id'
      clearable={false}
      data={enumsMapper(data)}
      value={String(periodFields.period_month_id)}
      onChange={(value) => setPeriodField('period_month_id', value ? Number(value) : null)}
    />
  );
};

export default PeriodMonthSelect;
