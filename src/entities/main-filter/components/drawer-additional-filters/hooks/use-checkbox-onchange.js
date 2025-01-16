import { useFilterStore } from '@/shared/store/use-filter-store';

const useCheckboxOnchange = (fieldKey) => {
  const { checkboxFields, setCheckboxField } = useFilterStore();
  const fieldValues = checkboxFields[fieldKey];

  const onChange = (value) => {
    const hasValueInStore = fieldValues.includes(value);
    if (hasValueInStore) {
      setCheckboxField({ fieldKey, fieldValue: fieldValues.filter((item) => item !== value) });
    } else {
      setCheckboxField({ fieldKey, fieldValue: [...fieldValues, value] });
    }
  };
  return onChange;
};

export default useCheckboxOnchange;
