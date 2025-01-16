import { useEffect } from 'react';

import { useFilterStore } from '@/shared/store/use-filter-store';

export const useSetDefaultValues = ({ data, fieldKey }) => {
  const { setCheckboxField, checkboxFields } = useFilterStore();
  useEffect(() => {
    const ids = checkboxFields[fieldKey];
    if (!ids && data?.length) {
      setCheckboxField({
        fieldKey,
        fieldValue: data.filter((item) => item.is_default).map((item) => item.id),
      });
    }
  }, [data]);
};
