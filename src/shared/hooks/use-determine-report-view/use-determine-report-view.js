import { useFilterStore } from '@/shared/store/use-filter-store';

export const useDetermineReportView = () => {
  const { reportViewFields } = useFilterStore();
  const isTableView = reportViewFields.report_view_id === 1;
  const isGraphicView = reportViewFields.report_view_id === 2;
  return {
    isGraphicView,
    isTableView,
  };
};
