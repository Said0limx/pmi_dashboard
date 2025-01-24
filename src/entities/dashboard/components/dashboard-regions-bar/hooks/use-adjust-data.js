import { useMemo } from 'react';

import { useFilterStore } from '@/shared/store/use-filter-store';
import { YEARLY } from '@/shared/variables/period-type-types';

export const useAdjustData = (data) => {
  const { periodFields } = useFilterStore();
  return useMemo(() => {
    const labels = [];
    const datasets = [];
    const backgroundColors = [];
    data.forEach((item) => {
      labels.push(item.title);
      datasets.push(periodFields.period_type_id === YEARLY ? item.year_amount : item.plan_amount);
      backgroundColors.push(item.color);
    });
    return { labels, datasets, backgroundColors };
  }, [data, periodFields.period_type_id]);
};
