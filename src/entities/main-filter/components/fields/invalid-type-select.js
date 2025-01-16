import { useTranslations } from 'next-intl';

import { useInvalidTypesList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const InvalidTypeSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useInvalidTypesList();
  const t = useTranslations();
  return (
    <Select
      label={t('Nogironlik turi')}
      placeholder={t('Nogironlik turi')}
      name='invalid_type_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default InvalidTypeSelect;
