import { useFilterStore } from '@/shared/store/use-filter-store';

export const useClassificationKey = () => {
  const { classificationFields } = useFilterStore();
  const enums = {
    1: 'category',
    2: 'problem',
    3: 'classification',
  };
  const classifierTypeId = classificationFields.classifier_type_id;
  const categoryId = classificationFields.category_id;
  const problemId = classificationFields.problem_id;
  // eslint-disable-next-line no-nested-ternary
  const key = problemId ? 'classification' : categoryId ? 'problem' : enums[classifierTypeId];
  return { classifierKey: key, categoryId, problemId, classifierTypeId };
};
