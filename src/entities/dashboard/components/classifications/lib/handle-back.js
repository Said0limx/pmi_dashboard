export const handleBack = (classificationFields, setClassificationField) => {
  if (classificationFields.classification_id) {
    return setClassificationField('classification_id', null);
  }
  if (classificationFields.problem_id) {
    return setClassificationField('problem_id', null);
  }
  if (classificationFields.category_id) {
    return setClassificationField('category_id', null);
  }
  if (classificationFields.is_dashboard_classification) {
    return setClassificationField('is_dashboard_classification', false);
  }
};
