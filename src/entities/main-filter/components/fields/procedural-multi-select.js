import { useTranslations } from 'next-intl';

import { useProceduralTasksList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui/multi-select';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ProceduralMultiSelect = () => {
  const { data = [] } = useProceduralTasksList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();
  return (
    <MultiSelect
      label={t('Masalaning protsessualligi')}
      placeholder={t('Masalaning protsessualligi')}
      name='procedural_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.procedural_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'procedural_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default ProceduralMultiSelect;
