import useResetPeriodTypeToYearly from '@/shared/hooks/use-reset-period-type-to-yearly';
import { useFilterStore } from '@/shared/store/use-filter-store';

import HeatMap from './heat-map';
import LineView from './line-view';

const HeatMapAndLineChart = ({ data, headers, isLoading }) => {
  const {
    reportViewFields: { report_graphic_view_id },
    periodFields: { period_type_id },
  } = useFilterStore();

  useResetPeriodTypeToYearly();

  if (isLoading || period_type_id === 6) return null;
  switch (report_graphic_view_id) {
    case 2:
      return <LineView data={data} headers={headers} isLoading={isLoading} />;
    case 3:
      return <HeatMap data={data} headers={headers} isLoading={isLoading} />;
    default:
      return null;
  }
};

export default HeatMapAndLineChart;
