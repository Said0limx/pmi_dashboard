import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { proceduralTasksListQueryOptions } from '@/shared/query-options/procedural-task-list';
import { MultiSelect } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ProceduralTypeMultiSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useSuspenseQuery(proceduralTasksListQueryOptions());
  const t = useTranslations();
  return (
    <MultiSelect
      label={t('Masalani protsesualigi')}
      placeholder={t('Masalani protsesualigi')}
      name='procedural_ids'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default ProceduralTypeMultiSelect;
