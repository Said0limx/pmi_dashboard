import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

const ScalesNumberCategoryCreate = ({ initialValues, opened, close, onSuccess = () => {} }) => {
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{ title: '!font-semibold' }}
        title={`${initialValues ? 'Update' : 'Create'} scales number category`}
        size={'xl'}
      >
        <Form initialValues={initialValues} close={close} onSuccess={onSuccess} />
      </Modal>
    </div>
  );
};

const Form = ({ initialValues, close, onSuccess: OnS }) => {
  const queryClient = useQueryClient();

  const { key, getInputProps, onSubmit } = useForm({
    mode: 'controlled',
    initialValues: initialValues || {
      title_oz: '',
      title_uz: '',
      title_ru: '',
      code_name: '',
      enabled: '1',
    },
    validate: {
      title_oz: (value) => (value ? null : 'Title OZ is required'),
      title_uz: (value) => (value ? null : 'Title UZ is required'),
      title_ru: (value) => (value ? null : 'Title RU is required'),
      code_name: (value) => (value ? null : 'Code name is required'),
    },
  });

  const { mutate, isPending } = useMutation();

  const onSuccess = () => {
    close();
    queryClient.invalidateQueries({ queryKey: ['admin/scales-number-category/list'] });
    toast.success('Scale number category created');
  };

  const onError = (error) => {
    error.response?.data?.data?.map((item) => {
      toast.error(item.message);
    });
    if (!error.response?.data?.data?.length)
      toast.error(error.response?.data?.message || 'Something went wrong');
  };

  const createStrategy = (values) => {
    mutate(
      {
        url: initialValues
          ? `/admin/scales-number-category/update/${initialValues.id}`
          : '/admin/scales-number-category/create',
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

  return (
    <form onSubmit={onSubmit(createStrategy)}>
      <div className='flex flex-col gap-3 mb-5'>
        <div className='grid grid-cols-3 gap-3'>
          <TextInput
            label='Title OZ'
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('title_oz')}
            className='!text-main_deep_blue'
            {...getInputProps('title_oz')}
          />
          <TextInput
            label='Title UZ'
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('title_uz')}
            className='!text-main_deep_blue'
            {...getInputProps('title_uz')}
          />
          <TextInput
            label='Title RU'
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('title_ru')}
            className='!text-main_deep_blue'
            {...getInputProps('title_ru')}
          />
        </div>

        <div className='grid grid-cols-2 gap-3 '>
          <Select
            label='Enabled'
            {...getInputProps('enabled')}
            key={key('enabled')}
            name={'enabled'}
            data={[
              { value: '1', label: 'Enabled' },
              { value: '0', label: 'Disabled' },
            ]}
          />

          <TextInput
            label='Code name'
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('code_name')}
            className='!text-main_deep_blue'
            {...getInputProps('code_name')}
          />
        </div>
      </div>

      <div className='flex justify-end gap-2'>
        <Button type='button' color='red' onClick={close} disabled={isPending}>
          Bekor qilish
        </Button>
        <Button type='submit' loading={isPending} disabled={isPending}>
          {initialValues ? 'Yangilash' : 'Yaratish'}
        </Button>
      </div>
    </form>
  );
};

export default ScalesNumberCategoryCreate;
