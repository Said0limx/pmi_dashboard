import { useTranslations } from 'next-intl';

import { useCollectiveList } from '@/shared/api-hooks/main-filter';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const CollectiveListSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useCollectiveList();
  const t = useTranslations();

  return (
    <Select
      label={t('Murojaat toifasi')}
      placeholder={t('Murojaat toifasi')}
      name='collective_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default CollectiveListSelect;
