import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { proceduralTasksListQueryOptions } from '@/shared/query-options/procedural-task-list';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ProceduralTypeSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useSuspenseQuery(proceduralTasksListQueryOptions());
  const t = useTranslations();
  return (
    <Select
      label={t('Masalani protsesualigi')}
      placeholder={t('Masalani protsesualigi')}
      name='is_procedural'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default ProceduralTypeSelect;
