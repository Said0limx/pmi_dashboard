'use client';
import { useDistrictsList, useMahallaList, useRegionsList } from '../api-hooks/main-filter';
import { useFilterStore } from '../store/use-filter-store';

export const DetermineArea = () => {
  const { areaFields } = useFilterStore();
  const { data: regions } = useRegionsList();
  const { data: districts } = useDistrictsList();
  const { data: mahallas } = useMahallaList();

  const region = regions?.find((region) => region.id === areaFields.region_id);
  const district = districts?.find((district) => district.id === areaFields.district_id);
  const mahalla = mahallas?.find((mahalla) => mahalla.id === areaFields.mahalla_id);
  return (
    <div className='text-lg font-bold text-main_deep_blue dark:text-white'>
      {region?.title} {district && `- ` + district?.title} {mahalla && `- ` + mahalla?.title}
    </div>
  );
};
