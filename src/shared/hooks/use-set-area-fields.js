import { useFilterStore } from '../store/use-filter-store';

const useSetAreaFields = () => {
  const {
    setAreaField,
    areaFields: { territory_type_id },
  } = useFilterStore();
  const onClick = ({ district_id, region_id }) => {
    if (territory_type_id === 1) {
      setAreaField('region_id', region_id);
    } else if (territory_type_id === 2) {
      if (region_id) {
        setAreaField('region_id', region_id);
      }
      setAreaField('district_id', district_id);
    }
  };
  return onClick;
};

export default useSetAreaFields;
