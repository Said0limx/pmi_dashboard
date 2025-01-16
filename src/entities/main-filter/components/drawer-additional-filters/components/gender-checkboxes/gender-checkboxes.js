import { Checkbox } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useGendersList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Title } from '@/shared/ui';

import useCheckboxOnchange from '../../hooks/use-checkbox-onchange';
import { useSetDefaultValues } from '../../hooks/use-set-default-values';

export const GenderCheckboxes = () => {
  const t = useTranslations();
  const { data = [] } = useGendersList();
  const { checkboxFields } = useFilterStore();
  useSetDefaultValues({
    data: data,
    fieldKey: 'gender_ids',
  });
  const onChange = useCheckboxOnchange('gender_ids');
  return (
    <div>
      <Title>{t('Мурожаатчи жинси')}:</Title>
      <div className='flex flex-col flex-wrap gap-2'>
        {data.map((item) => {
          const value = checkboxFields['gender_ids']?.includes(item.id);
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
