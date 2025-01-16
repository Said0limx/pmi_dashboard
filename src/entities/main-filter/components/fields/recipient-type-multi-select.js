'use client';
import { useTranslations } from 'next-intl';

import { useRecipientTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const RecipientTypeMultiSelect = () => {
  const { data = [] } = useRecipientTypesList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();

  return (
    <MultiSelect
      label={t('Murojaatchi turi')}
      placeholder={t('Murojaatchi turi')}
      name='recipient_type_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.recipient_type_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'recipient_type_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default RecipientTypeMultiSelect;
