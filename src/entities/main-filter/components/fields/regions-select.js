import { useTranslations } from 'next-intl';

import { useRegionsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const RegionsSelect = () => {
  const { data = [] } = useRegionsList();
  const t = useTranslations();
  const { areaFields, setAreaField } = useFilterStore();
  return (
    <Select
      key={areaFields.region_id}
      label={t('Hudud')}
      placeholder={t('Hudud')}
      name='region_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={String(areaFields.region_id)}
      onChange={(value) => {
        setAreaField('region_id', value ? Number(value) : null);
        setAreaField('district_id', null);
        setAreaField('mahalla_id', null);
      }}
    />
  );
};

export default RegionsSelect;
