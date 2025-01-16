import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

import { useMutation } from '@/shared/hooks';
import { TextInput } from '@/shared/ui/text-input';
const CatalogForm = ({ selected, setSelected, url, listKey, className, onSuccess }) => {
  const t = useTranslations();
  const { getInputProps, key, values, setValues } = useForm({
    initialValues: {
      title_uz: '',
      title_oz: '',
      title_ru: '',
    },
  });

  useEffect(() => {
    if (selected) {
      setValues({
        title_uz: selected?.title_uz,
        title_ru: selected?.title_ru,
        title_oz: selected?.title_oz,
      });
    }
  }, [selected, setValues]);
  const { mutate, isPending } = useMutation();
  const queryClient = useQueryClient();

  return (
    <>
      <div className={twMerge('grid grid-cols-3 gap-5 mt-5', className)}>
        <TextInput
          getInputProps={getInputProps}
          formKey={key}
          name='title_uz'
          label={t('Title uz')}
          placeholder={t('Title uz')}
        />
        <TextInput
          getInputProps={getInputProps}
          formKey={key}
          name='title_oz'
          label={t('Title oz')}
          placeholder={t('Title oz')}
        />
        <TextInput
          getInputProps={getInputProps}
          formKey={key}
          name='title_ru'
          label={t('Title ru')}
          placeholder={t('Title ru')}
        />
      </div>
      <div className='mt-5 flex justify-end'>
        <Button
          loading={isPending}
          disabled={isPending}
          onClick={() => {
            mutate(
              { url: `${url}/${selected?.id}`, data: values, method: 'PUT' },
              {
                onSuccess: () => {
                  toast.success(t('Saved'));
                  queryClient.invalidateQueries({ queryKey: [listKey] });
                  setSelected(null);
                  onSuccess?.();
                },
                onError: () => {
                  toast.error(t('Something went wrong'));
                },
              },
            );
          }}
          mt='md'
        >
          {t('Saqlash')}
        </Button>
      </div>
    </>
  );
};

export default CatalogForm;
