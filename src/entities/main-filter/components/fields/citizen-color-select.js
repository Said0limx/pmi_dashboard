import { useTranslations } from 'next-intl';

import { useCitizenColorsList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const CitizenColorSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useCitizenColorsList();
  const t = useTranslations();

  return (
    <Select
      label={t('Murojaatchi rangi')}
      placeholder={t('Murojaatchi rangi')}
      name='citizen_color_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default CitizenColorSelect;
