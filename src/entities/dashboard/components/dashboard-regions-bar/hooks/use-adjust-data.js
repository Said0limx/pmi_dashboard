import { useMemo } from 'react';

import { useScaleColor } from '@/shared/api-hooks';
import { useUrlParams } from '@/shared/hooks';

export const useAdjustData = (data) => {
  const { getParam } = useUrlParams();
  const { data: { fields: scaleColors10000 = [] } = {} } = useScaleColor({ key: '10000' });
  const { data: { fields: scaleColors1000 = [] } = {} } = useScaleColor({ key: '1000' });
  const findTheColor = (value, scaleColors) => {
    if (scaleColors.length > 0) {
      const found = scaleColors.find((item) => value <= item.max && value >= item.min);
      return found?.color;
    }
  };
  return useMemo(() => {
    const labels = [];
    const datasets = [];
    const backgroundColors = [];
    data.forEach((item) => {
      labels.push(item.title);
      datasets.push(item['1_period_amount']);
      // eslint-disable-next-line no-nested-ternary
      const color = getParam('region_id')
        ? findTheColor(item['1_period_amount'], scaleColors1000)
        : getParam('period_type_id') === '4' || getParam('period_type_id') === '5'
          ? findTheColor(item['1_period_amount'], scaleColors1000)
          : findTheColor(item['1_period_amount'], scaleColors10000);
      backgroundColors.push(item.color);
    });
    return { labels, datasets, backgroundColors };
  }, [data, getParam, scaleColors1000, scaleColors10000]);
};
