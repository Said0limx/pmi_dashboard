import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useTerritoryTypesList } from '@/shared/api-hooks/main-filter';
import { usePageIndicator } from '@/shared/hooks/usePageIndicator';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const TerritoryTypeSelect = () => {
  const { isClassification, isSectionOfOrganizations } = usePageIndicator();
  const {
    reportViewFields: { report_category_id, report_graphic_view_id },
  } = useFilterStore();
  if (
    (isClassification || isSectionOfOrganizations) &&
    report_category_id === 1 &&
    report_graphic_view_id === 1
  )
    return <Component />;
  return null;
};

const Component = () => {
  const { data = [], isFetched } = useTerritoryTypesList();
  const t = useTranslations();
  const {
    areaFields: { region_id, district_id, territory_type_id },
    setAreaField,
  } = useFilterStore();
  useEffect(() => {
    if (region_id) {
      setAreaField('territory_type_id', 2);
    }
    if (district_id) {
      setAreaField('territory_type_id', 3);
    }
    if (!region_id && !district_id) {
      setAreaField('territory_type_id', 1);
    }
  }, [region_id, district_id, setAreaField]);
  useEffect(() => {
    if (!territory_type_id && data.length) setAreaField('territory_type_id', data[0]?.id);
  }, [data, isFetched, setAreaField, territory_type_id]);
  return (
    <Select
      disabled={region_id || district_id}
      key={territory_type_id}
      label={t('Hudud turi')}
      placeholder={t('Hudud turi')}
      name='territory_type_id'
      clearable={false}
      data={enumsMapper(data, { labelKey: 'title' })}
      value={String(territory_type_id)}
      onChange={(value) => {
        setAreaField('territory_type_id', value ? Number(value) : null);
      }}
    />
  );
};

export default TerritoryTypeSelect;
