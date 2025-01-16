'use client';
import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { ImageUpload } from '@/assets/icons';
import { useFetch, useMutation } from '@/shared/hooks';
import { makeImageUrl } from '@/shared/utils/make-image-url';

const ExecutorCreate = ({ initialValues, opened, close, onSuccess = () => {} }) => {
  const t = useTranslations();
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{ title: '!font-semibold' }}
        title={t('Create executor')}
        size={'xl'}
      >
        <Form initialValues={initialValues} close={close} onSuccess={onSuccess} />
      </Modal>
    </div>
  );
};

const Form = ({ initialValues, close, onSuccess: OnS }) => {
  const queryClient = useQueryClient();
  const t = useTranslations();
  const { key, getInputProps, onSubmit, values, setFieldValue } = useForm({
    mode: 'controlled',
    initialValues: initialValues || {
      first_name_oz: '',
      first_name_uz: '',
      first_name_ru: '',
      last_name_oz: '',
      last_name_uz: '',
      last_name_ru: '',
      middle_name_oz: '',
      middle_name_uz: '',
      middle_name_ru: '',
      position_oz: '',
      position_uz: '',
      position_ru: '',
      authority_id: '',
      enabled: '1',
      personal_image_file: '',
    },
    validate: {
      first_name_oz: (value) => (value ? null : t('First name oz is required')),
      first_name_uz: (value) => (value ? null : t('First name uz is required')),
      first_name_ru: (value) => (value ? null : t('First name ru is required')),
      last_name_oz: (value) => (value ? null : t('First name oz is required')),
      last_name_uz: (value) => (value ? null : t('First name uz is required')),
      last_name_ru: (value) => (value ? null : t('First name ru is required')),
      middle_name_oz: (value) => (value ? null : t('First name oz is required')),
      middle_name_uz: (value) => (value ? null : t('First name uz is required')),
      middle_name_ru: (value) => (value ? null : t('First name ru is required')),
      position_oz: (value) => (value ? null : t('Position oz is required')),
      position_uz: (value) => (value ? null : t('Position uz is required')),
      position_ru: (value) => (value ? null : t('Position ru is required')),
      authority_id: (value) => (value ? null : t('Authority is required')),
    },
  });

  const { mutate, isPending } = useMutation();

  const onSuccess = () => {
    close();
    queryClient.invalidateQueries({ queryKey: ['admin/strategy-executor/list'] });
    toast.success(t('Executor created'));
  };

  const onError = (error) => {
    error.response?.data?.data?.map((item) => {
      toast.error(item.message);
    });
    if (!error.response?.data?.data?.length)
      toast.error(error.response?.data?.message || t('Something went wrong'));
  };

  const createStrategy = (values) => {
    const formData = new FormData();
    formData.append('first_name_oz', values.first_name_oz);
    formData.append('first_name_uz', values.first_name_uz);
    formData.append('first_name_ru', values.first_name_ru);
    formData.append('last_name_oz', values.last_name_oz);
    formData.append('last_name_uz', values.last_name_uz);
    formData.append('last_name_ru', values.last_name_ru);
    formData.append('middle_name_oz', values.middle_name_oz);
    formData.append('middle_name_uz', values.middle_name_uz);
    formData.append('middle_name_ru', values.middle_name_ru);
    formData.append('position_oz', values.position_oz);
    formData.append('position_uz', values.position_uz);
    formData.append('position_ru', values.position_ru);
    formData.append('enabled', values.enabled);
    formData.append('authority_id', values.authority_id);
    if (typeof values.personal_image_file === 'object')
      formData.append('personal_image_file', values.personal_image_file);
    mutate(
      {
        url: initialValues
          ? `/admin/strategy-executor/${initialValues.id}/update`
          : '/admin/strategy-executor/create',
        data: formData,
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

  const [searchValue, setSearchValue] = useState(initialValues?.authority_title || '');
  const [debounced] = useDebouncedValue(searchValue, 200);

  const { data: authorities, isFetching } = useFetch({
    key: ['authority/list', debounced],
    url: '/authority/list',
    params: (debounced && { title: debounced }) || {},
    queryOptions: {
      enabled: !!debounced,
    },
  });

  const authoritiesMap =
    authorities?.map((item) => ({
      value: String(item.id),
      label: item.title,
    })) || [];

  return (
    <form onSubmit={onSubmit(createStrategy)}>
      <div className='flex flex-col gap-3 mb-5'>
        <div className='grid grid-cols-3 gap-3'>
          <TextInput
            label={t('Ismi oz')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('first_name_oz')}
            className='!text-main_deep_blue'
            {...getInputProps('first_name_oz')}
          />
          <TextInput
            label={t('Ismi uz')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('first_name_uz')}
            className='!text-main_deep_blue'
            {...getInputProps('first_name_uz')}
          />
          <TextInput
            label={t('Ismi ru')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('first_name_ru')}
            className='!text-main_deep_blue'
            {...getInputProps('first_name_ru')}
          />
          <TextInput
            label={t('Familiyasi oz')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('last_name_oz')}
            className='!text-main_deep_blue'
            {...getInputProps('last_name_oz')}
          />
          <TextInput
            label={t('Familiyasi uz')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('last_name_uz')}
            className='!text-main_deep_blue'
            {...getInputProps('last_name_uz')}
          />
          <TextInput
            label={t('Familiyasi ru')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('last_name_ru')}
            className='!text-main_deep_blue'
            {...getInputProps('last_name_ru')}
          />
          <TextInput
            label={t('Otasining ismi oz')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('middle_name_oz')}
            className='!text-main_deep_blue'
            {...getInputProps('middle_name_oz')}
          />
          <TextInput
            label={t('Otasining ismi uz')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('middle_name_uz')}
            className='!text-main_deep_blue'
            {...getInputProps('middle_name_uz')}
          />
          <TextInput
            label={t('Otasining ismi ru')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('middle_name_ru')}
            className='!text-main_deep_blue'
            {...getInputProps('middle_name_ru')}
          />
          <TextInput
            label={t('Position oz')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('position_oz')}
            className='!text-main_deep_blue'
            {...getInputProps('position_oz')}
          />
          <TextInput
            label={t('Position uz')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('position_uz')}
            className='!text-main_deep_blue'
            {...getInputProps('position_uz')}
          />
          <TextInput
            label={t('Position ru')}
            labelProps={{ className: 'dark:text-white text-[#171725]' }}
            key={key('position_ru')}
            className='!text-main_deep_blue'
            {...getInputProps('position_ru')}
          />
        </div>

        <div className='grid grid-cols-5 gap-3 '>
          <div className='flex flex-col gap-3 col-span-4'>
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
              {...getInputProps('authority_id')}
              label={t('Authority')}
              searchable
              clearable
              nothingFoundMessage={
                // eslint-disable-next-line no-nested-ternary
                isFetching
                  ? 'Loading...'
                  : debounced && !authorities?.length
                    ? t('No authorities found')
                    : t('Search for authorities')
              }
              filter={() => authoritiesMap}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              name={'authority_id'}
              data={authoritiesMap}
            />
          </div>
          <label htmlFor='personal_image_file' className='flex flex-col cursor-pointer'>
            <div>{t('Rasm')}</div>
            <input
              id='personal_image_file'
              type='file'
              hidden
              accept='image/png, image/jpeg, image/jpg'
              onChange={(e) => setFieldValue('personal_image_file', e.target.files[0])}
            />
            <div className='h-full w-full border rounded-[4px] flex items-center justify-center'>
              {values.personal_image_file &&
                (typeof values.personal_image_file === 'object' ? (
                  <Image
                    src={URL.createObjectURL(values.personal_image_file)}
                    width={100}
                    height={80}
                    alt='icon'
                  />
                ) : (
                  <Image
                    src={makeImageUrl(values.personal_image_file)}
                    width={100}
                    height={80}
                    className='max-h-[80px]'
                    alt='icon'
                  />
                ))}
              {!values.personal_image_file && <ImageUpload width={60} height={60} />}
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

export default ExecutorCreate;
