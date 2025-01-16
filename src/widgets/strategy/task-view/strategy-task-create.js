import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { ImageUpload } from '@/assets/icons';
import { useExecutor } from '@/shared/api-hooks';
import { useMutation } from '@/shared/hooks';
import { makeImageUrl } from '@/shared/utils/make-image-url';
import ExecutorCreate from '@/widgets/executor/executor-create';

const StrategyTaskCreate = ({ initialValues, opened, close }) => {
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{ title: '!font-semibold' }}
        title={initialValues ? 'Update strategy task' : 'Create strategy task'}
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

  const { key, getInputProps, onSubmit, values, setFieldValue } = useForm({
    mode: 'controlled',
    initialValues: initialValues || {
      title_oz: '',
      title_uz: '',
      title_ru: '',
      sort: '',
      enabled: '1',
      icon_file: '',
      executor_id: '',
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
    queryClient.invalidateQueries({ queryKey: [`admin/strategy/${params.strategy_id}/view`] });
    toast.success('Task created');
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
    formData.append('executor_id', values.executor_id);
    formData.append('parent_id', params.strategy_id);
    if (typeof values.icon_file === 'object') formData.append('icon_file', values.icon_file);
    mutate(
      {
        url: initialValues
          ? `/admin/strategy/task/${initialValues.id}/update`
          : '/admin/strategy/task/create',
        data: formData,
      },
      { onSuccess, onError },
    );
  };
  const [opened, { open, close: executorClose }] = useDisclosure(false);
  const { data: { data: executors = [] } = {} } = useExecutor();

  return (
    <div>
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

          <div className='grid grid-cols-5 gap-3 '>
            <div className='flex flex-col gap-3 col-span-4'>
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
              <div className='flex items-end gap-2'>
                <Select
                  className='w-full'
                  label='Executor'
                  {...getInputProps('executor_id')}
                  key={key('executor_id')}
                  name={'executor_id'}
                  data={executors.map((item) => ({
                    value: String(item.id),
                    label: item.full_name,
                  }))}
                />
                <Button onClick={open} color='blue' className='min-w-min' variant='outline'>
                  Yaratish
                </Button>
              </div>
            </div>
            <label htmlFor='icon_file' className='flex flex-col cursor-pointer'>
              <div>Icon</div>
              <input
                id='icon_file'
                type='file'
                hidden
                accept='image/png, image/svg+xml'
                onChange={(e) => setFieldValue('icon_file', e.target.files[0])}
              />
              <div className='h-full w-full border rounded-[4px] flex items-center justify-center'>
                {values.icon_file &&
                  (typeof values.icon_file === 'object' ? (
                    <Image
                      src={URL.createObjectURL(values.icon_file)}
                      className='max-h-[80px]'
                      width={100}
                      height={80}
                      alt='icon'
                    />
                  ) : (
                    <Image
                      src={makeImageUrl(values.icon_file)}
                      width={100}
                      height={80}
                      className='max-h-[80px]'
                      alt='icon'
                    />
                  ))}
                {!values.icon_file && <ImageUpload width={60} height={60} />}
              </div>
            </label>
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
      <ExecutorCreate
        opened={opened}
        close={executorClose}
        open={open}
        onSuccess={(data) => {
          queryClient.invalidateQueries({ queryKey: ['admin/strategy-executor/list'] }).then(() => {
            setFieldValue('executor_id', String(data.id));
          });
        }}
      />
    </div>
  );
};

export default StrategyTaskCreate;
