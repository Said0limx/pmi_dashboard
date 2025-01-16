import { useFilterStore } from '../store/use-filter-store';

export const useSetClassificationId = () => {
  const {
    setClassificationField,
    classificationFields: { classifier_type_id },
  } = useFilterStore();
  const handleClick = ({ id, parent_id }) => {
    if (classifier_type_id === 1) {
      setClassificationField('category_id', id);
    }
    if (classifier_type_id === 2) {
      if (parent_id) {
        setClassificationField('category_id', parent_id);
      }
      setClassificationField('problem_id', id);
    }
  };
  return handleClick;
};
