import { ActionIcon, Button, Modal, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { useScalesNumberCategoryList } from '@/shared/api-hooks';
import { useScalesSettingsList } from '@/shared/api-hooks/use-scales-settings-list';
import { useScalesTableList } from '@/shared/api-hooks/use-scales-table-list';
import { useFetch, useMutation } from '@/shared/hooks';

const ScalesColorsCreate = ({ initialValues, opened, close, onSuccess = () => {} }) => {
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{ title: '!font-semibold' }}
        title={`${initialValues ? 'Update' : 'Create'} scales number`}
        size={'100%'}
      >
        <Form initialValues={initialValues} close={close} onSuccess={onSuccess} />
      </Modal>
    </div>
  );
};

const Form = ({ initialValues, close, onSuccess: OnS }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const {
    key,
    getInputProps,
    onSubmit,
    getValues,
    values,
    setFieldValue,
    insertListItem,
    removeListItem,
  } = useForm({
    mode: 'controlled',
    initialValues: initialValues || {
      scale_table_id: '',
      scale_setting_id: '',
      scale_number_category_id: '',
      fields: [
        {
          field_id: '',
          color: '#000000',
        },
      ],
      model: '',
    },
  });

  const { mutate, isPending } = useMutation();

  const onSuccess = () => {
    close();
    queryClient.invalidateQueries({ queryKey: ['admin/scales-color/list'] });
    toast.success(initialValues ? 'Scale color updated' : 'Scale color created');
  };

  const onError = (error) => {
    error.response?.data?.data?.map((item) => {
      toast.error(item.message);
    });
    if (!error.response?.data?.data?.length)
      toast.error(error.response?.data?.message || 'Something went wrong');
  };

  const { data: scalesTable } = useScalesTableList();
  const { data: scalesSettings } = useScalesSettingsList();
  const { data: scalesNumberCategory } = useScalesNumberCategoryList({
    queryOptions: {
      enabled: values.scale_setting_id === '1',
    },
  });
  const { data: { data: scaleFields, model } = {} } = useFetch({
    url: '/admin/scales-field/list',
    key: 'admin/scales-field/list',
    method: 'POST',
    dataKey: null,
    body: {
      scale_table_id: +values.scale_table_id,
      scale_setting_id: +values.scale_setting_id,
      scale_number_category_id: values.scale_number_category_id
        ? +values.scale_number_category_id
        : null,
    },
    queryOptions: {
      enabled:
        !!getValues().scale_table_id &&
        !!(
          (getValues().scale_setting_id === '1' && getValues().scale_number_category_id) ||
          getValues().scale_setting_id === '2'
        ),
    },
  });
  const createColor = (values) => {
    mutate(
      {
        url: initialValues
          ? `/admin/scales-color/update/${initialValues.id}`
          : '/admin/scales-color/create',
        data: {
          scale_table_id: +values.scale_table_id,
          scale_setting_id: +values.scale_setting_id,
          scale_number_category_id: values.scale_number_category_id
            ? +values.scale_number_category_id
            : null,
          fields: values.fields.map((item) => ({
            field_id: +item.field_id,
            color: item.color,
          })),
          model: model,
        },
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
    <form onSubmit={onSubmit(createColor)}>
      <div className='grid grid-cols-2 gap-3 mb-5'>
        <Select
          label='Scale table'
          {...getInputProps('scale_table_id')}
          key={key('scale_table_id')}
          name={'scale_table_id'}
          data={scalesTable?.map((item) => ({
            value: String(item.id),
            label: item[`title_${params.locale}`],
          }))}
        />
        <Select
          label='Scale setting'
          {...getInputProps('scale_setting_id')}
          key={key('scale_setting_id')}
          name={'scale_setting_id'}
          data={scalesSettings?.map((item) => ({
            value: String(item.id),
            label: item[`title_${params.locale}`],
          }))}
        />
        {getValues().scale_setting_id === '1' && (
          <Select
            label='Scale number category'
            {...getInputProps('scale_number_category_id')}
            key={key('scale_number_category_id')}
            name={'scale_number_category_id'}
            className='col-span-2'
            data={scalesNumberCategory?.map((item) => ({
              value: String(item.id),
              label: item[`title_${params.locale}`],
            }))}
          />
        )}

        <div className='col-span-2'>
          {getValues().scale_table_id &&
            ((getValues().scale_setting_id === '1' && getValues().scale_number_category_id) ||
              getValues().scale_setting_id === '2') &&
            getValues().fields?.map((item, index) => {
              return (
                <div key={index} className='flex items-end gap-3'>
                  <Select
                    label='Field'
                    {...getInputProps(`fields.${index}.field_id`)}
                    key={key(`fields.${index}.field_id`)}
                    name={`fields.${index}.field_id`}
                    className='w-full'
                    data={scaleFields?.map((item) => ({
                      value: String(item.id),
                      label:
                        getValues().scale_setting_id === '1'
                          ? `${item.category} ${item.min_value}-${item.max_value}`
                          : item.title,
                    }))}
                  />
                  <input
                    label='Color'
                    className='!text-main_deep_blue h-10'
                    defaultValue={item.color}
                    type='color'
                    onBlur={(e) => setFieldValue(`fields.${index}.color`, e.target.value)}
                  />
                  <ActionIcon
                    variant='outline'
                    color='red'
                    size={'lg'}
                    onClick={() => removeListItem('fields', index)}
                    className='mb-1'
                  >
                    <IconTrash size={18} stroke={1.5} />
                  </ActionIcon>
                </div>
              );
            })}
        </div>
      </div>

      <div className='flex justify-center'>
        {getValues().scale_setting_id && (
          <div>
            <Button
              leftSection={<IconPlus />}
              onClick={() => insertListItem('fields', { field_id: '', color: '#000000' })}
            >
              Qo'shish
            </Button>
          </div>
        )}
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

export default ScalesColorsCreate;
