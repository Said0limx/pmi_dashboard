import { useTranslations } from 'next-intl';

import { useDistrictsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const DistrictsSelect = () => {
  return <Component />;
};

const Component = () => {
  const { data = [], isFetching } = useDistrictsList();
  const { areaFields, setAreaField } = useFilterStore();
  const t = useTranslations();

  return (
    <Select
      key={areaFields.district_id}
      label={t('Tuman')}
      placeholder={t('Tuman')}
      name='district_id'
      disabled={isFetching}
      data={enumsMapper(data, { labelKey: 'title' })}
      value={String(areaFields.district_id)}
      onChange={(value) => {
        setAreaField('district_id', value ? Number(value) : null);
        setAreaField('mahalla_id', null);
      }}
    />
  );
};

export default DistrictsSelect;
