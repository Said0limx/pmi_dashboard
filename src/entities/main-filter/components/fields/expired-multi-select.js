import { useTranslations } from 'next-intl';

import { useExpiredList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { MultiSelect } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ExpiredMultiSelect = () => {
  const { data = [] } = useExpiredList();
  const t = useTranslations();
  const { columnFields, setColumnField } = useFilterStore();

  return (
    <MultiSelect
      label={t('Muddati buzilgan')}
      placeholder={t('Muddati buzilgan')}
      name='expired_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={columnFields.expired_ids.map((id) => String(id))}
      onChange={(value) => {
        setColumnField(
          'expired_ids',
          value.map((id) => Number(id)),
        );
      }}
    />
  );
};

export default ExpiredMultiSelect;
