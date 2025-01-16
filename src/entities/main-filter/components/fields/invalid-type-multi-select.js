import { useTranslations } from 'next-intl';

import { useInvalidTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui/multi-select';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const InvalidTypeMultiSelect = () => {
  const { data = [] } = useInvalidTypesList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();
  return (
    <MultiSelect
      label={t('Nogironlik turi')}
      placeholder={t('Nogironlik turi')}
      name='invalid_type_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.invalid_type_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'invalid_type_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default InvalidTypeMultiSelect;
