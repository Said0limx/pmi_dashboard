import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useFilterStore } from '@/shared/store/use-filter-store';

export const BackButtonForClassifications = () => {
  const { classificationFields, setClassificationField } = useFilterStore();
  const t = useTranslations();

  const handleBack = () => {
    const fields = [
      'classification_id',
      'problem_id',
      'category_id',
      'is_dashboard_classification',
    ];

    for (const field of fields) {
      if (classificationFields[field]) {
        return setClassificationField(
          field,
          field === 'is_dashboard_classification' ? false : null,
        );
      }
    }
  };

  const hasActiveField = [
    'classification_id',
    'problem_id',
    'category_id',
    'is_dashboard_classification',
  ].some((field) => classificationFields[field]);

  if (!hasActiveField) {
    return null;
  }

  return <Button onClick={handleBack}>{t('Orqaga')}</Button>;
};
