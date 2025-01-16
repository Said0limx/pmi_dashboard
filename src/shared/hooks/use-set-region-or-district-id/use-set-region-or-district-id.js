'use client';

import { useFilterStore } from '@/shared/store/use-filter-store';

export const useSetRegionOrDistrictId = () => {
  const {
    areaFields: { region_id, district_id, territory_type_id },
    setAreaField,
  } = useFilterStore();

  const handleSet = (id) => {
    // if (territory_type_id) {
    //   if (territory_type_id === 1 && !region_id) setAreaField('region_id', id);
    //   if (territory_type_id === 2 && !district_id) setAreaField('district_id', id);
    // } else {
    if (region_id && district_id) return null;
    if (region_id) setAreaField('district_id', id);
    else if (id !== 9999) setAreaField('region_id', id);
    // }
  };

  return {
    handleSet,
  };
};
