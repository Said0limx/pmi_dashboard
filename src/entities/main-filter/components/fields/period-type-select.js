'use client';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePeriodTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const PeriodTypeSelect = ({ filterOptions = (data) => data }) => {
  const { data = [] } = usePeriodTypesList();
  const { periodFields, setPeriodField } = useFilterStore();

  useEffect(() => {
    if (!periodFields.period_type_id) {
      setPeriodField('period_type_id', 4);
    }
  }, []);
  const t = useTranslations();
  return (
    <Select
      label={t('Turi')}
      placeholder={t('Turi')}
      name='period_type_id'
      clearable={false}
      value={String(periodFields.period_type_id)}
      onChange={(value) => setPeriodField('period_type_id', value ? Number(value) : null)}
      data={filterOptions(enumsMapper(data))}
    />
  );
};

export default PeriodTypeSelect;
