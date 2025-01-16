import { useTranslations } from 'next-intl';

import { useCitizenColorsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const CitizenColorMultiSelect = () => {
  const { data = [] } = useCitizenColorsList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();

  return (
    <MultiSelect
      label={t('Murojaatchi rangi')}
      placeholder={t('Murojaatchi rangi')}
      name='citizen_color_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.citizen_color_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'citizen_color_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default CitizenColorMultiSelect;
