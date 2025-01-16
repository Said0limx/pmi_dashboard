import { useTranslations } from 'next-intl';

import { useExpiredList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ExpiredSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useExpiredList();
  const t = useTranslations();
  return (
    <Select
      label={t('Muddati buzilgan')}
      placeholder={t('Muddati buzilgan')}
      name='expired_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default ExpiredSelect;
