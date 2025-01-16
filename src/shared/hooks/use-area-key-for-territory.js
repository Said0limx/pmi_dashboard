import { useFilterStore } from '../store/use-filter-store';

const useAreaKeyForTerritory = () => {
  const {
    areaFields: { territory_type_id, region_id, district_id, mahalla_id },
  } = useFilterStore();
  if (territory_type_id) {
    if (territory_type_id === 3) return 'mahalla';
    if (territory_type_id === 2 && district_id) return 'mahalla';
    if (territory_type_id === 2) return 'district';
    if (territory_type_id === 1 && region_id && district_id) return 'mahalla';
    if (territory_type_id === 1 && region_id) return 'district';
    if (territory_type_id === 1) return 'region';
  } else {
    return region_id && district_id ? 'mahalla' : region_id ? 'district' : 'region';
  }
};

export default useAreaKeyForTerritory;
