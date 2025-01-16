import { useTranslations } from 'next-intl';

import { useEmploymentTypesList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const EmploymentTypeSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useEmploymentTypesList();
  const t = useTranslations();

  return (
    <Select
      label={t('Bandlik turi')}
      placeholder={t('Bandlik turi')}
      name='employment_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default EmploymentTypeSelect;
