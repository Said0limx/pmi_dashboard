'use client';

import { useFilterStore } from '@/shared/store/use-filter-store';

import BarView from './bar-view';
import HeatMapAndLineChart from './heat-map-and-line-chart';

export const GraphicView = ({ data, headers, isLoading }) => {
  const {
    reportViewFields: { report_graphic_view_id },
  } = useFilterStore();
  switch (report_graphic_view_id) {
    case 1:
      return <BarView data={data} headers={headers} isLoading={isLoading} />;
    case 2:
    case 3:
      return <HeatMapAndLineChart data={data} headers={headers} isLoading={isLoading} />;

    default:
      return null;
  }
};
