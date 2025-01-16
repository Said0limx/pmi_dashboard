import { Checkbox } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useEmploymentTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Title } from '@/shared/ui';

import useCheckboxOnchange from '../../hooks/use-checkbox-onchange';
import { useSetDefaultValues } from '../../hooks/use-set-default-values';

export const EmploymentCheckboxes = () => {
  const t = useTranslations();
  const { data = [] } = useEmploymentTypesList();
  const { checkboxFields } = useFilterStore();
  useSetDefaultValues({
    data: data,
    fieldKey: 'employment_type_ids',
  });
  const onChange = useCheckboxOnchange('employment_type_ids');
  return (
    <div>
      <Title>{t('Бандлик турлари')}:</Title>
      <div className='flex flex-col flex-wrap gap-2'>
        {data.map((item) => {
          const value = checkboxFields['employment_type_ids']?.includes(item.id);
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
