import { useFilterStore } from '@/shared/store/use-filter-store';

export const useIdentifyAreaKey = () => {
  const { areaFields } = useFilterStore();
  const areaKey =
    // eslint-disable-next-line no-nested-ternary
    areaFields.region_id && areaFields.district_id
      ? 'mahalla'
      : areaFields.region_id
        ? 'district'
        : 'region';
  return { areaKey };
};
