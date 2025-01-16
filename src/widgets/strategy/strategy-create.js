import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { ImageUpload } from '@/assets/icons';
import { useMutation } from '@/shared/hooks';
import { makeImageUrl } from '@/shared/utils/make-image-url';

const StrategyCreate = ({ initialValues, opened, close }) => {
  const t = useTranslations();
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{ title: '!font-semibold' }}
        title={initialValues ? t('Update strategy') : t('Create strategy')}
        size={'xl'}
      >
        <Form initialValues={initialValues} close={close} />
      </Modal>
    </div>
  );
};

const Form = ({ initialValues, close }) => {
  const queryClient = useQueryClient();

  const t = useTranslations();
  const { key, getInputProps, onSubmit, values, setFieldValue } = useForm({
    mode: 'controlled',
    initialValues: initialValues || {
      title_oz: '',
      title_uz: '',
      title_ru: '',
      sort: '',
      enabled: '1',
      icon_file: '',
    },
    validate: {
      title_oz: (value) => (value ? null : t('Title oz is required')),
      title_uz: (value) => (value ? null : t('Title uz is required')),
      title_ru: (value) => (value ? null : t('Title ru is required')),
      sort: (value) => (value ? null : t('Sort is required')),
    },
  });

  const { mutate, isPending } = useMutation();

  const onSuccess = () => {
    close();
    queryClient.invalidateQueries({ queryKey: ['admin/strategy/list'] });
    toast.success(t('Strategy created'));
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
    if (typeof values.icon_file === 'object') formData.append('icon_file', values.icon_file);
    mutate(
      {
        url: initialValues
          ? `/admin/strategy/${initialValues.id}/update`
          : '/admin/strategy/create',
        data: formData,
      },
      { onSuccess, onError },
    );
  };
  return (
    <form onSubmit={onSubmit(createStrategy)}>
      <div className='flex flex-col gap-3 mb-5'>
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

        <div className='grid grid-cols-5 gap-3 '>
          <div className='flex flex-col gap-3 col-span-4'>
            <TextInput
              label={t('Sort')}
              labelProps={{ className: 'dark:text-white text-[#171725]' }}
              key={key('sort')}
              type='number'
              className='!text-main_deep_blue'
              {...getInputProps('sort')}
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
          </div>
          <label htmlFor='icon_file' className='flex flex-col cursor-pointer'>
            <div>{t('Icon')}</div>
            <input
              id='icon_file'
              type='file'
              hidden
              accept='image/png, image/svg'
              onChange={(e) => setFieldValue('icon_file', e.target.files[0])}
            />
            <div className='h-full w-full border rounded-[4px] flex items-center justify-center'>
              {values.icon_file &&
                (typeof values.icon_file === 'object' ? (
                  <Image
                    src={URL.createObjectURL(values.icon_file)}
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
          {t('Bekor qilish')}
        </Button>
        <Button type='submit' loading={isPending} disabled={isPending}>
          {initialValues ? t('Yangilash') : t('Yaratish')}
        </Button>
      </div>
    </form>
  );
};

export default StrategyCreate;
