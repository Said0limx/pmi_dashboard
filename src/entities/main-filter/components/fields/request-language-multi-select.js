import { useTranslations } from 'next-intl';

import { useRequestLanguagesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui/multi-select';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const RequestLanguageMultiSelect = () => {
  const { data = [] } = useRequestLanguagesList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();
  return (
    <MultiSelect
      label={t('Ariza tili')}
      placeholder={t('Ariza tili')}
      name='request_language_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.request_language_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'request_language_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default RequestLanguageMultiSelect;
