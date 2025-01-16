import { useTranslations } from 'next-intl';

import { useEmploymentTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui/multi-select';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const EmploymentTypeMultiSelect = () => {
  const { data = [] } = useEmploymentTypesList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();
  return (
    <MultiSelect
      label={t('Bandlik turi')}
      placeholder={t('Bandlik turi')}
      name='employment_type_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.employment_type_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'employment_type_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default EmploymentTypeMultiSelect;
