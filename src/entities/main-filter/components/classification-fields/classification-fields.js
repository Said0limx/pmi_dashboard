import { useDetermineReportView } from '@/shared/hooks';
import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';
import { useFilterStore } from '@/shared/store/use-filter-store';

import { usePageIndicator } from '../../../../shared/hooks/usePageIndicator';
import ClassificationCategorySelect from '../fields/classification-category-select';
import ClassificationProblemSelect from '../fields/classification-problem-select';
import ClassificationSelect from '../fields/classification-select';

const ClassificationFields = () => {
  const {
    reportViewFields: { report_graphic_view_id },
  } = useFilterStore();
  const { isClassification } = usePageIndicator();
  const { territory, classification } = useDetermineReportCategory();
  const { isGraphicView } = useDetermineReportView();
  const shouldRenderClassificationSelect =
    (isClassification && isGraphicView && report_graphic_view_id !== 1) ||
    (isClassification && territory);
  if (!classification && !isClassification) return null;
  return (
    <>
      <ClassificationCategorySelect />
      <ClassificationProblemSelect />
      {shouldRenderClassificationSelect ? <ClassificationSelect /> : null}
    </>
  );
};

export default ClassificationFields;
