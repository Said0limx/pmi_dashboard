import { useTranslations } from 'next-intl';

import { useApplicationTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui/multi-select';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ApplicationTypeMultiSelect = () => {
  const { data = [] } = useApplicationTypesList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();
  return (
    <MultiSelect
      label={t('Ariza turi')}
      placeholder={t('Ariza turi')}
      name='app_type_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.app_type_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'app_type_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default ApplicationTypeMultiSelect;
