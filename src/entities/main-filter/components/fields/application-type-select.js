import { useTranslations } from 'next-intl';

import { useApplicationTypesList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui/select';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ApplicationTypeSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useApplicationTypesList();
  const t = useTranslations();
  return (
    <Select
      label={t('Ariza turi')}
      placeholder={t('Ariza turi')}
      name='app_type_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default ApplicationTypeSelect;
