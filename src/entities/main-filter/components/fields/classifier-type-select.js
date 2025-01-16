import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useClassifierTypesList } from '@/shared/api-hooks/main-filter';
import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

function ClassifierTypeSelect() {
  const { classification } = useDetermineReportCategory();

  if (classification) {
    return <Component />;
  }
}

const Component = () => {
  const { data = [] } = useClassifierTypesList();
  const {
    setClassificationField,
    classificationFields: { category_id, problem_id, classifier_type_id },
  } = useFilterStore();

  const t = useTranslations();
  useEffect(() => {
    if (category_id) {
      setClassificationField('classifier_type_id', 2);
    }
    if (problem_id) {
      setClassificationField('classifier_type_id', 3);
    }
    if (!category_id && !problem_id) {
      setClassificationField('classifier_type_id', 1);
    }
  }, [category_id, problem_id, setClassificationField]);

  return (
    <Select
      disabled={category_id || problem_id}
      label={t('Klassifikatsa turi')}
      placeholder={t('Klassifikatsa turi')}
      name='classifier_type_id'
      clearable={false}
      data={enumsMapper(data, { labelKey: 'title' })}
      value={String(classifier_type_id)}
      onChange={(value) =>
        setClassificationField('classifier_type_id', value ? Number(value) : null)
      }
    />
  );
};

export default ClassifierTypeSelect;
