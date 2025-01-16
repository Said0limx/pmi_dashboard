import { Select } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useFetch } from '@/shared/hooks';

const FileIdSelect = ({ setValues, values }) => {
  const { data = [] } = useFetch({
    key: 'translations-file-list',
    url: '/admin/translate/file-list',
  });

  const t = useTranslations();

  return (
    <Select
      className='w-full'
      clearable
      placeholder={t('File')}
      label={t('File')}
      value={String(values.file_id)}
      data={data.map((item) => {
        return {
          value: String(item.id),
          label: item.name,
        };
      })}
      onChange={(value) => {
        setValues({
          ...values,
          file_id: value,
        });
      }}
    />
  );
};

export default FileIdSelect;
