import { useTranslations } from 'next-intl';

import { useResultTypesList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ResultTypeSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useResultTypesList();
  const t = useTranslations();
  return (
    <Select
      label={t('Natija turi')}
      placeholder={t('Natija turi')}
      name='result_type_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default ResultTypeSelect;
