import { Select } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useFetch } from '@/shared/hooks';

const CategorySelect = ({ setValues, values }) => {
  const { data = [] } = useFetch({
    key: 'translations-category-list',
    url: '/admin/language-translate/category-list',
  });
  const t = useTranslations();
  return (
    <Select
      label={t('Category')}
      placeholder={t('Category')}
      clearable
      value={String(values.lang_translate_category_id)}
      data={data.map((item) => {
        return {
          value: String(item.id),
          label: item.title,
        };
      })}
      onChange={(value) => {
        setValues({
          ...values,
          lang_translate_category_id: value,
        });
      }}
    />
  );
};

export default CategorySelect;
