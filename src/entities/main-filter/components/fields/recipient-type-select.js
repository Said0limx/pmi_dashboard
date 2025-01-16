import { useTranslations } from 'next-intl';

import { useRecipientTypesList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const RecipientTypeSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useRecipientTypesList();
  const t = useTranslations();
  return (
    <Select
      label={t('Shaxs turi')}
      placeholder={t('Shaxs turi')}
      name='recipient_type_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default RecipientTypeSelect;
