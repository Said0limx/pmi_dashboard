import { useTranslations } from 'next-intl';

import { useRepeatabilityTypesList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const RepeatabilityTypeSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useRepeatabilityTypesList();
  const t = useTranslations();
  return (
    <Select
      label={t('Takroriylik turi')}
      placeholder={t('Takroriylik turi')}
      name='repeatability_type_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default RepeatabilityTypeSelect;
