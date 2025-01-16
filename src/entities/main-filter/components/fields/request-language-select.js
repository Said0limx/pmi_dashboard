import { useTranslations } from 'next-intl';

import { useRequestLanguagesList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const RequestLanguageSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useRequestLanguagesList();
  const t = useTranslations();
  return (
    <Select
      label={t('Ariza tili')}
      placeholder={t('Ariza tili')}
      name='request_language_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default RequestLanguageSelect;
