import { Checkbox } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useSourceList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Title } from '@/shared/ui';

import useCheckboxOnchange from '../../hooks/use-checkbox-onchange';
import { useSetDefaultValues } from '../../hooks/use-set-default-values';

export const SourcesCheckboxes = () => {
  const t = useTranslations();
  const { data: sources = [] } = useSourceList();
  const { checkboxFields } = useFilterStore();

  useSetDefaultValues({
    data: sources.sort((a, b) => b.is_default - a.is_default),
    fieldKey: 'source_ids',
  });
  const onChange = useCheckboxOnchange('source_ids');
  return (
    <div>
      <Title>{t('Келиб тушиш манбаи')}:</Title>
      <div className='flex flex-col flex-wrap gap-2'>
        {sources.map((item) => {
          const value = checkboxFields['source_ids']?.includes(item.id);
          return (
            <Checkbox
              key={item.id}
              checked={!!value}
              onChange={() => onChange(item.id)}
              className='cursor-pointer'
              classNames={{ label: 'text-nowrap' }}
              label={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};
