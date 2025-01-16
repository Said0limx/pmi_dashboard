import { useTranslations } from 'next-intl';

import { useRequestFormTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui/multi-select';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const FormTypeMultiSelect = () => {
  const { data = [] } = useRequestFormTypesList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();
  return (
    <MultiSelect
      label={t('Ariza shakli')}
      placeholder={t('Ariza shakli')}
      name='form_type_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.form_type_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'form_type_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default FormTypeMultiSelect;
