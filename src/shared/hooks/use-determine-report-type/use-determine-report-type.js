import { useFilterStore } from '@/shared/store/use-filter-store';

export const useDetermineReportType = () => {
  const { reportViewFields } = useFilterStore();
  const isStats = reportViewFields.report_type_id === 2;
  const isDynamic = reportViewFields.report_type_id === 1;
  return {
    isStats,
    isDynamic,
  };
};
