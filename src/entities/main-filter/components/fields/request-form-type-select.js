import { useTranslations } from 'next-intl';

import { useRequestFormTypesList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const RequestFormTypeSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useRequestFormTypesList();
  const t = useTranslations();
  return (
    <Select
      label={t('Murojaat turi')}
      placeholder={t('Murojaat turi')}
      name='form_type_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default RequestFormTypeSelect;
