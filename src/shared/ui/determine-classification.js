'use client';
import {
  useClassificationCategoryList,
  useClassificationList,
  useClassificationProblemList,
} from '../api-hooks/main-filter';
import { useFilterStore } from '../store/use-filter-store';

export const DetermineClassification = () => {
  const {
    classificationFields: { category_id, problem_id, classification_id },
  } = useFilterStore();
  const { data: categories = [] } = useClassificationCategoryList();
  const { data: problems = [] } = useClassificationProblemList();
  const { data: classifications = [] } = useClassificationList();

  const category = categories?.find((item) => item.id === category_id);
  const problem = problems?.find((item) => item.id === problem_id);
  const classification = classifications?.find((item) => item.id === classification_id);

  return (
    <div className='text-lg text-main_deep_blue dark:text-white flex gap-3 mt-5'>
      {category && (
        <div>
          <span className='font-bold'>Soha:</span> {category?.title}
        </div>
      )}
      {problem && (
        <div>
          <span className='font-bold'>Yo'nalish:</span> {problem?.title}
        </div>
      )}
      {classification && (
        <div>
          <span className='font-bold'>Masala:</span> {classification?.title}
        </div>
      )}
    </div>
  );
};
