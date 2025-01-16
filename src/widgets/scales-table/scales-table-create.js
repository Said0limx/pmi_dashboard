import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { useScalesSettingsList } from '@/shared/api-hooks';
import { useMutation } from '@/shared/hooks';

const ScalesTableCreate = ({ initialValues, opened, close, onSuccess = () => {} }) => {
  const t = useTranslations();
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{ title: '!font-semibold' }}
        title={t(`${initialValues ? 'Update' : 'Create'} scales table`)}
        size={'xl'}
      >
        <Form initialValues={initialValues} close={close} onSuccess={onSuccess} />
      </Modal>
    </div>
  );
};

const Form = ({ initialValues, close, onSuccess: OnS }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const t = useTranslations();
  const { key, getInputProps, onSubmit } = useForm({
    mode: 'controlled',
    initialValues: initialValues || {
      title_oz: '',
      title_uz: '',
      title_ru: '',
      code_name: '',
      scale_setting_id: '',
      enabled: '1',
    },
    validate: {
      title_oz: (value) => (value ? null : t('Title OZ is required')),
      title_uz: (value) => (value ? null : t('Title UZ is required')),
      title_ru: (value) => (value ? null : t('Title RU is required')),
      scale_setting_id: (value) => (value ? null : t('Scale setting is required')),
      code_name: (value) => (value ? null : t('Code name is required')),
    },
  });

  const { mutate, isPending } = useMutation();

  const onSuccess = () => {
    close();
    queryClient.invalidateQueries({ queryKey: ['admin/scales-table/list'] });
    toast.success(initialValues ? t('Scale updated') : t('Scale created'));
  };

  const onError = (error) => {
    error.response?.data?.data?.map((item) => {
      toast.error(item.message);
    });
    if (!error.response?.data?.data?.length)
      toast.error(error.response?.data?.message || t('Something went wrong'));
  };

  const createStrategy = (values) => {
    mutate(
      {
        url: initialValues
          ? `/admin/scales-table/update/${initialValues.id}`
          : '/admin/scales-table/create',
        data: values,
        method: initialValues ? 'PUT' : 'POST',
      },
      {
        onSuccess: ({ data }) => {
          OnS(data);
          onSuccess();
        },
        onError,
      },
    );
  };

  const { data: scalesSettings } = useScalesSettingsList();

  return (
    <form onSubmit={onSubmit(createStrategy)}>
      <div className='grid grid-cols-3 gap-3 mb-5'>
        <TextInput
          label={t('Title OZ')}
          labelProps={{ className: 'dark:text-white text-[#171725]' }}
          key={key('title_oz')}
          className='!text-main_deep_blue'
          {...getInputProps('title_oz')}
        />
        <TextInput
          label={t('Title UZ')}
          labelProps={{ className: 'dark:text-white text-[#171725]' }}
          key={key('title_uz')}
          className='!text-main_deep_blue'
          {...getInputProps('title_uz')}
        />
        <TextInput
          label={t('Title RU')}
          labelProps={{ className: 'dark:text-white text-[#171725]' }}
          key={key('title_ru')}
          className='!text-main_deep_blue'
          {...getInputProps('title_ru')}
        />
        <Select
          label={t('Enabled')}
          {...getInputProps('enabled')}
          key={key('enabled')}
          name={'enabled'}
          data={[
            { value: '1', label: 'Enabled' },
            { value: '0', label: 'Disabled' },
          ]}
        />
        <Select
          label={t('Scale setting')}
          {...getInputProps('scale_setting_id')}
          key={key('scale_setting_id')}
          name={'scale_setting_id'}
          data={scalesSettings?.map((item) => ({
            value: String(item.id),
            label: item[`title_${params.locale}`],
          }))}
        />
        <TextInput
          label={t('Code name')}
          labelProps={{ className: 'dark:text-white text-[#171725]' }}
          key={key('code_name')}
          className='!text-main_deep_blue'
          {...getInputProps('code_name')}
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

export default ScalesTableCreate;
