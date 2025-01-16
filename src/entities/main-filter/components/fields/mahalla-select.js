import { useTranslations } from 'next-intl';

import { useMahallaList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const MahallaSelect = () => {
  const {
    areaFields,
    reportViewFields: { report_graphic_view_id },
  } = useFilterStore();

  if (report_graphic_view_id === 1 || !areaFields.region_id || !areaFields.district_id) return null;

  return <Component />;
};

const Component = () => {
  const { data = [] } = useMahallaList();
  const { areaFields, setAreaField } = useFilterStore();
  const t = useTranslations();
  return (
    <Select
      label={t('Mahalla')}
      placeholder={t('Mahalla')}
      name='mahalla_id'
      value={String(areaFields.mahalla_id)}
      data={enumsMapper(data, { labelKey: 'title' })}
      onChange={(value) => {
        setAreaField('mahalla_id', value ? Number(value) : null);
      }}
    />
  );
};

export default MahallaSelect;
