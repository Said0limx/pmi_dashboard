import { useFilterStore } from '@/shared/store/use-filter-store';
import * as reportCategory from '@/shared/variables/report-category-types';

export const useDetermineReportCategory = () => {
  const { reportViewFields } = useFilterStore();
  const { report_category_id } = reportViewFields;

  return {
    territory: reportCategory.IN_THE_SECTION_OF_TERRITORIES === report_category_id,
    sources: reportCategory.IN_THE_SECTION_OF_SOURCES === report_category_id,
    classification: reportCategory.IN_THE_SECTION_OF_CLASSIFICATIONS === report_category_id,
    organization: reportCategory.IN_THE_SECTION_OF_ORGANIZATIONS === report_category_id,
  };
};
