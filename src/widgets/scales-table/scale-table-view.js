'use client';
import { ActionIcon, Button, ColorInput, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useScalesTableView } from '@/shared/api-hooks';
import { useMutation } from '@/shared/hooks';
import { ContentBox, Loader, Title } from '@/shared/ui';

const ScaleTableView = () => {
  const { data, isLoading } = useScalesTableView();
  const t = useTranslations();

  return (
    <div className='flex flex-col gap-5'>
      <ContentBox>
        <Title>{t('Scale table view')}</Title>
      </ContentBox>

      <ContentBox>
        {isLoading && (
          <div className='h-52 flex justify-center items-center'>
            <Loader />
          </div>
        )}
        {!isLoading && data && <UpdateForm data={data} />}
      </ContentBox>
    </div>
  );
};

const UpdateForm = ({ data }) => {
  const t = useTranslations();

  const { values, setFieldValue, insertListItem, removeListItem, getInputProps } = useForm({
    mode: 'controlled',
    initialValues: {
      fields: [],
    },
  });

  const { mutate, isPending } = useMutation();
  const updateColors = (values) => {
    mutate(
      {
        url: data.scale_color?.id
          ? `/admin/scales-color/update/${data.scale_color?.id}`
          : '/admin/scales-color/create',
        data: {
          scale_table_id: data.id,
          scale_setting_id: data.setting?.id,
          scale_number_category_id: values.scale_number_category_id
            ? +values.scale_number_category_id
            : null,
          fields: values.fields.map((item) => ({
            ...(data.setting.id == 1
              ? {
                  min: item.min,
                  max: item.max,
                }
              : { field_id: +item.field_id }),

            color: item.color,
            bg_color: item.bg_color,
            font_color: item.font_color,
          })),
          model: data.model,
        },
        method: data.scale_color?.id ? 'PUT' : 'POST',
      },
      {
        onError: (error) => {
          error.response?.data?.data?.map((item) => {
            toast.error(item.message);
          });
          if (!error.response?.data?.data?.length) {
            toast.error(error.response?.data?.message || 'Something went wrong');
          }
        },
        onSuccess: () => {
          toast.success(data?.scale_color?.id ? 'Scale color updated' : 'Scale color created');
        },
      },
    );
  };

  useEffect(() => {
    if (data.setting?.id === 1) {
      data?.fields.sort((a, b) => a.min - b.min);
    }
    data?.fields.forEach((item, index) => {
      insertListItem(
        'fields',
        {
          ...(data.setting?.id === 1
            ? {
                field_id: null,
                min: String(item.min) || '0',
                max: String(item.max) || '0',
                color: item.color || '#000000',
                bg_color: item.bg_color || '#000000',
                font_color: item.font_color || '#000000',
              }
            : {
                field_id: item.id,
                color: item.color?.color || '#000000',
                bg_color: item.color?.bg_color || '#000000',
                font_color: item.color?.font_color || '#000000',
              }),
        },
        index,
      );
    });
  }, [data]);

  return (
    <div>
      <div className='divide-y'>
        <div className='py-2 divide-x flex gap-2'>
          <span className='font-bold'>{t('Nomi')}:</span> {data.title}
        </div>
        <div className='py-2 divide-x flex gap-2'>
          <span className='font-bold'>{t('Setting title')}:</span> {data.setting?.title}
        </div>
        <div className='py-2 divide-x flex gap-2'>
          <span className='font-bold'>{t('Code name')}:</span> {data?.code_name}
        </div>
      </div>
      {data.setting?.id === 1 && (
        <div>
          <Table className='mt-5' withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={50}>{t('№')}</Table.Th>
                <Table.Th>{t('Min value')}</Table.Th>
                <Table.Th>{t('Max value')}</Table.Th>
                <Table.Th w={250}>{t('Rangi')}</Table.Th>
                <Table.Th w={250}>{t('Orqa fon rangi')}</Table.Th>
                <Table.Th w={250}>{t('Text rangi')}</Table.Th>
                <Table.Th w={40}>{t('Action')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {values.fields?.map((field, index) => {
                return (
                  <Table.Tr key={`${field.field_id}-${field.category_id}`}>
                    <Table.Td align='center'>{index + 1}</Table.Td>
                    <Table.Td>
                      <TextInput
                        label={t('Min value')}
                        className='!text-main_deep_blue '
                        defaultValue={values.fields[index]?.min}
                        type='number'
                        onChange={(e) => setFieldValue(`fields.${index}.min`, e.target.value)}
                      />
                    </Table.Td>
                    <Table.Td>
                      {' '}
                      <TextInput
                        label={t('Max value')}
                        className='!text-main_deep_blue '
                        defaultValue={values.fields[index]?.max}
                        type='number'
                        onChange={(e) => setFieldValue(`fields.${index}.max`, e.target.value)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <ColorInput label={t('Rangi')} {...getInputProps(`fields.${index}.color`)} />
                    </Table.Td>
                    <Table.Td align='center'>
                      <ColorInput
                        label={t('Orqa fon rangi')}
                        {...getInputProps(`fields.${index}.bg_color`)}
                      />
                    </Table.Td>
                    <Table.Td align='center'>
                      <ColorInput
                        label={t('Text rangi')}
                        {...getInputProps(`fields.${index}.font_color`)}
                      />
                    </Table.Td>
                    <Table.Td align='center'>
                      <ActionIcon
                        variant='outline'
                        color='red'
                        size={'lg'}
                        onClick={() => removeListItem('fields', index)}
                      >
                        <IconTrash size={18} stroke={1.5} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
          <div className='flex items-center justify-center mt-5'>
            <Button
              leftSection={<IconPlus />}
              onClick={() => {
                const average =
                  values.fields[values.fields.length - 1]?.max -
                  values.fields[values.fields.length - 1]?.min;
                insertListItem('fields', {
                  field_id: '',
                  color: '#000000',
                  bg_color: '#000000',
                  font_color: '#000000',
                  min: values.fields[values.fields.length - 1]?.max || '0',
                  max: values.fields[values.fields.length - 1]?.max
                    ? String(+values.fields[values.fields.length - 1]?.max + average)
                    : '0',
                });
              }}
            >
              Qo'shish
            </Button>
          </div>
        </div>
      )}
      {data.setting?.id === 2 && (
        <Table className='mt-5' withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>{t('№')}</Table.Th>
              <Table.Th>{t('Ustun')}</Table.Th>
              <Table.Th w={250}>{t('Rangi')}</Table.Th>
              <Table.Th w={250}>{t('Orqa fon rangi')}</Table.Th>
              <Table.Th w={250}>{t('Text rangi')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.fields?.map((field, index) => {
              return (
                <Table.Tr key={field.id}>
                  <Table.Td align='center'>{index + 1}</Table.Td>
                  <Table.Td>{field.title}</Table.Td>
                  <Table.Td>
                    <ColorInput label={t('Rangi')} {...getInputProps(`fields.${index}.color`)} />
                  </Table.Td>
                  <Table.Td align='center'>
                    <ColorInput
                      label={t('Orqa fon rangi')}
                      {...getInputProps(`fields.${index}.bg_color`)}
                    />
                  </Table.Td>
                  <Table.Td align='center'>
                    <ColorInput
                      label={t('Text rangi')}
                      {...getInputProps(`fields.${index}.font_color`)}
                    />
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      )}
      <div className='mt-5 flex justify-end'>
        <Button
          variant='outline'
          onClick={() => updateColors(values)}
          disabled={isPending}
          className='w-full'
        >
          {t('Saqlash')}
        </Button>
      </div>
    </div>
  );
};

export default ScaleTableView;
