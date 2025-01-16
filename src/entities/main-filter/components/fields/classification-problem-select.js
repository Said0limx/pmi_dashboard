import { useTranslations } from 'next-intl';

import { useClassificationProblemList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ClassificationProblemSelect = () => {
  const { data = [] } = useClassificationProblemList();
  const { setClassificationField, classificationFields } = useFilterStore();

  const t = useTranslations();
  return (
    <Select
      disabled={!classificationFields.category_id}
      key={classificationFields.problem_id}
      label={t("Yo'nalish")}
      placeholder={t("Yo'nalish")}
      name='problem_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={String(classificationFields.problem_id)}
      onChange={(value) => {
        setClassificationField('problem_id', value ? Number(value) : null);
        setClassificationField('classification_id', null);
      }}
    />
  );
};

export default ClassificationProblemSelect;
