export const getItemKeyString = (classificationFields) => {
  if (!classificationFields.category_id) {
    return 'category_id';
  }
  if (!classificationFields.problem_id) {
    return 'problem_id';
  }
};
