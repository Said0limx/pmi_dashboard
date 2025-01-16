import { Checkbox } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useCitizenColorsList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Title } from '@/shared/ui';

import useCheckboxOnchange from '../../hooks/use-checkbox-onchange';
import { useSetDefaultValues } from '../../hooks/use-set-default-values';

export const CitizenColorCheckboxes = () => {
  const t = useTranslations();
  const { data = [] } = useCitizenColorsList();
  const { checkboxFields } = useFilterStore();
  useSetDefaultValues({
    data,
    fieldKey: 'citizen_color_ids',
  });
  const onChange = useCheckboxOnchange('citizen_color_ids');
  return (
    <div>
      <Title>{t('Келиб тушиш манбаи')}:</Title>
      <div className='flex flex-col flex-wrap gap-2'>
        {data.map((item) => {
          const value = checkboxFields['citizen_color_ids']?.includes(item.id);
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
