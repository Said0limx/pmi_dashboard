import { useTranslations } from 'next-intl';

import { useRepeatabilityTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const RepeatabilityTypeMultiSelect = () => {
  const { data = [] } = useRepeatabilityTypesList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();

  return (
    <MultiSelect
      label={t('Takroriylik turi')}
      placeholder={t('Takroriylik turi')}
      name='repeatability_type_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.repeatability_type_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'repeatability_type_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default RepeatabilityTypeMultiSelect;
