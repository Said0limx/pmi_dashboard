import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

const StrategyTaskItemCreate = ({ initialValues, opened, close }) => {
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{ title: '!font-semibold' }}
        title={initialValues ? 'Update strategy task item' : 'Create strategy task item'}
        size={'xl'}
      >
        <Form initialValues={initialValues} close={close} />
      </Modal>
    </div>
  );
};

const Form = ({ initialValues, close }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { key, getInputProps, onSubmit } = useForm({
    mode: 'controlled',
    initialValues: initialValues || {
      title_oz: '',
      title_uz: '',
      title_ru: '',
      sort: '',
      enabled: '1',
    },
    validate: {
      title_oz: (value) => (value ? null : 'Title oz is required'),
      title_uz: (value) => (value ? null : 'Title uz is required'),
      title_ru: (value) => (value ? null : 'Title ru is required'),
      sort: (value) => (value ? null : 'Sort is required'),
    },
  });

  const { mutate, isPending } = useMutation();

  const onSuccess = () => {
    close();
    queryClient.invalidateQueries({ queryKey: [`admin/strategy/${params.task_id}/view`] });
    toast.success('Task item created');
  };

  const onError = (error) => {
    error.response?.data?.data?.map((item) => {
      toast.error(item.message);
    });
  };

  const createStrategy = (values) => {
    const formData = new FormData();
    formData.append('title_oz', values.title_oz);
    formData.append('title_uz', values.title_uz);
    formData.append('title_ru', values.title_ru);
    formData.append('sort', values.sort);
    formData.append('enabled', values.enabled);
    formData.append('parent_id', params.task_id);
    if (typeof values.icon_file === 'object') formData.append('icon_file', values.icon_file);
    mutate(
      {
        url: initialValues
          ? `/admin/strategy/task-item/${initialValues.id}/update`
          : '/admin/strategy/task-item/create',
        data: formData,
      },
      { onSuccess, onError },
    );
  };

  return (
    <form onSubmit={onSubmit(createStrategy)}>
      <div className='flex flex-col gap-3 mb-5'>
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
        <div className='grid grid-cols-2 gap-3'>
          <TextInput
            label='Sort'
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('sort')}
            type='number'
            className='!text-main_deep_blue'
            {...getInputProps('sort')}
          />
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

export default StrategyTaskItemCreate;
