import { Checkbox } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useComplexList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Title } from '@/shared/ui';

import useCheckboxOnchange from '../../hooks/use-checkbox-onchange';
import { useSetDefaultValues } from '../../hooks/use-set-default-values';

export const ComplexCheckboxes = () => {
  const t = useTranslations();
  const { data: sources = [] } = useComplexList();
  const { checkboxFields } = useFilterStore();

  useSetDefaultValues({
    data: sources.sort((a, b) => b.is_default - a.is_default),
    fieldKey: 'complex_ids',
  });
  const onChange = useCheckboxOnchange('complex_ids');

  return (
    <div>
      <Title>{t('Complex')}:</Title>
      <div className='flex flex-col flex-wrap gap-3 mt-3'>
        {sources.map((item) => {
          const value = checkboxFields['complex_ids']?.includes(item.id);
          return (
            <Checkbox
              key={item.id}
              checked={!!value}
              onChange={() => onChange(item.id)}
              className='cursor-pointer'
              classNames={{}}
              label={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};
