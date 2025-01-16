import { useTranslations } from 'next-intl';

import { useClassificationCategoryList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ClassificationCategorySelect = () => {
  const { data = [] } = useClassificationCategoryList();
  const { setClassificationField, classificationFields } = useFilterStore();
  const t = useTranslations();
  return (
    <Select
      key={classificationFields.category_id}
      label={t('Soha')}
      placeholder={t('Soha')}
      name='category_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={String(classificationFields?.category_id)}
      onChange={(value) => {
        setClassificationField('category_id', value ? Number(value) : null);
        setClassificationField('problem_id', null);
        setClassificationField('classification_id', null);
      }}
    />
  );
};

export default ClassificationCategorySelect;
