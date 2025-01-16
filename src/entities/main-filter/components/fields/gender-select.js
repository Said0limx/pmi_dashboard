import { useTranslations } from 'next-intl';

import { useGendersList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const GenderSelect = ({ setFieldValue, getInputProps, onChange = () => {} }) => {
  const { data = [] } = useGendersList();
  const t = useTranslations();
  return (
    <Select
      label={t('Jinsi')}
      placeholder={t('Jinsi')}
      name='gender'
      data={enumsMapper(data, { labelKey: 'title' })}
      onChange={onChange}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default GenderSelect;
