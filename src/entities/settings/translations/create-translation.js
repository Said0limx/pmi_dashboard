'use client';
import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

import CategorySelect from './category-id-select';

const CreateTranslation = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [values, setValues] = useState({
    key: '',
    lang_translate_category_id: 2,
    values: [
      {
        folder_id: 4,
        value: '',
        folder: 'en',
      },
      {
        folder_id: 2,
        value: '',
        folder: 'uz',
      },
      {
        folder_id: 3,
        value: '',
        folder: 'ru',
      },
      {
        folder_id: 1,
        value: '',
        folder: 'oz',
      },
    ],
  });
  const { mutate } = useMutation();
  const t = useTranslations();
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { url: '/admin/language-translate/create', data: values, method: 'POST' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['translations-list'] });
          close();
          toast.success('Translation created');
        },
        onError: (error) => {
          error.response?.data?.data?.map((item) => {
            toast.error(item.message);
          });
          if (!error.response?.data?.data?.length)
            toast.error(error.response?.data?.message || 'Something went wrong');
        },
      },
    );
  };
  return (
    <div>
      <Button onClick={open}>{t('Create')}</Button>
      <Modal opened={opened} size={'xl'} onClose={close} title={t('Translation create')} centered>
        <form onSubmit={handleSubmit}>
          <div className='mt-5 grid grid-cols-2 gap-2'>
            <TextInput
              label={t('Translation key')}
              placeholder={t('Translation key')}
              type='text'
              onChange={(e) => {
                setValues({ ...values, key: e.target.value });
              }}
            />
            <CategorySelect setValues={setValues} values={values} />
          </div>
          <div className='mt-5 grid grid-cols-4 gap-2'>
            {values.values.map((item, index) => {
              return (
                <TextInput
                  key={item.folder}
                  label={item.folder.toUpperCase()}
                  placeholder={item.folder.toUpperCase()}
                  type='text'
                  onChange={(e) => {
                    const { value } = e.target;
                    const newValues = [...values.values];
                    newValues[index].value = value;
                    setValues({
                      ...values,
                      values: newValues,
                    });
                  }}
                />
              );
            })}
          </div>
          <div className='flex items-center justify-end gap-2 mt-5'>
            <Button variant='outline' color='red' type='button' onClick={close}>
              {t('Cancel')}
            </Button>
            <Button variant='outline' type='submit'>
              {t('Create')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateTranslation;
