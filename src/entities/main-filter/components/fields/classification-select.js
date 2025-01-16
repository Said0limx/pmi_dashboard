import { useTranslations } from 'next-intl';

import { useClassificationList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ClassificationSelect = () => {
  const { data = [] } = useClassificationList();
  const { setClassificationField, classificationFields } = useFilterStore();
  const t = useTranslations();
  return (
    <Select
      key={classificationFields.classification_id}
      disabled={!classificationFields.problem_id}
      label={t('Masala')}
      placeholder={t('Masala')}
      name='classification_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={String(classificationFields?.classification_id)}
      onChange={(value) => {
        setClassificationField('classification_id', value ? Number(value) : null);
      }}
    />
  );
};

export default ClassificationSelect;
