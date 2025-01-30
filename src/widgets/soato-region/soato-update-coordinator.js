'use client';
import { Button, Modal, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

const SoatoUpdateCoordinator = ({ initialValues, opened, close, onSuccess = () => {} }) => {
  const t = useTranslations();
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{ title: '!font-semibold' }}
        title={t(`${initialValues ? 'Update' : 'Create'} soato coordinator`)}
        size={'xl'}
      >
        <Form initialValues={initialValues} close={close} onSuccess={onSuccess} />
      </Modal>
    </div>
  );
};

const Form = ({ initialValues, close, onSuccess }) => {
  const t = useTranslations();
  const { key, getInputProps, onSubmit } = useForm({
    mode: 'controlled',
    initialValues: {
      coordination: initialValues?.coordination || '',
    },
    validate: {
      coordination: (value) => (value ? null : t('Coordination is required')),
    },
  });

  const { mutate, isPending } = useMutation();

  const onError = (error) => {
    error.response?.data?.data?.map((item) => {
      toast.error(item.message);
    });
    if (!error.response?.data?.data?.length)
      toast.error(error.response?.data?.message || t('Something went wrong'));
  };

  const updateSoato = (values) => {
    mutate(
      {
        url: `/soato-region/edit/${initialValues.id}`,
        data: values,
        method: 'PUT',
      },
      {
        onSuccess: ({ data }) => {
          close();
          toast.success(t('Soato coordinator updated'));
          onSuccess(data);
        },
        onError,
      },
    );
  };

  return (
    <form onSubmit={onSubmit(updateSoato)}>
      <div className='flex flex-col gap-3 mb-5'>
        <Textarea
          label={t('Coordination')}
          labelProps={{ className: 'dark:text-white text-[#171725]' }}
          key={key('coordination')}
          rows={5}
          maxRows={10}
          className='!text-main_deep_blue'
          {...getInputProps('coordination')}
        />
      </div>

      <div className='flex justify-end gap-2'>
        <Button type='button' color='red' onClick={close} disabled={isPending}>
          {t('Bekor qilish')}
        </Button>
        <Button type='submit' loading={isPending} disabled={isPending}>
          {initialValues ? t('Yangilash') : t('Yaratish')}
        </Button>
      </div>
    </form>
  );
};

export default SoatoUpdateCoordinator;
