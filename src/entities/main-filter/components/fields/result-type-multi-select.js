'use client';
import { useTranslations } from 'next-intl';

import { useResultTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ResultTypeMultiSelect = () => {
  const { data = [] } = useResultTypesList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();

  return (
    <MultiSelect
      label={t('Natija turi')}
      placeholder={t('Natija turi')}
      name='result_type_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.result_type_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'result_type_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default ResultTypeMultiSelect;
