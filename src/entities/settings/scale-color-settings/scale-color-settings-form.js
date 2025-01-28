import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useColorsList, useColorTypesList } from '@/shared/api-hooks';
import { useMutation } from '@/shared/hooks';
import { ContentBox, Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

export const ScaleColorSettingsForm = () => {
  const t = useTranslations();
  const { setFieldValue, getInputProps, values } = useForm({
    initialValues: { min_color_hex_code: '', max_color_hex_code: '', color_type_id: '' },
  });
  const { data = [] } = useColorsList({
    params: { color_type_id: values.color_type_id },
    queryOptions: {
      enabled: !!values.color_type_id,
    },
  });
  const { data: colorTypes = [] } = useColorTypesList();

  const mapData = (selected) => {
    return data
      .filter((item) => item.hex_code != selected)
      .map((item) => ({
        value: String(item.hex_code),
        label: item.title,
      }));
  };

  useEffect(() => {
    if (data.length) {
      const min = data.find((item) => item.is_min).hex_code;
      const max = data.find((item) => item.is_max).hex_code;
      setFieldValue('min_color_hex_code', String(min));
      setFieldValue('max_color_hex_code', String(max));
    }
  }, [data]);
  const { mutate, isPending } = useMutation();
  return (
    <ContentBox className='w-full p-5 mb-5'>
      <div className='grid grid-cols-3 gap-5'>
        <Select
          clearable={false}
          getInputProps={getInputProps}
          setFieldValue={setFieldValue}
          name='color_type_id'
          data={enumsMapper(colorTypes, { labelKey: 'title' })}
          label={t('Сolor type')}
          placeholder={t('Сolor type')}
        />
        <Select
          clearable={false}
          getInputProps={getInputProps}
          setFieldValue={setFieldValue}
          name='min_color_hex_code'
          data={mapData(values.max_color_hex_code)}
          label={t('Minimum rang')}
          placeholder={t('Minimum rang')}
        />
        <Select
          clearable={false}
          getInputProps={getInputProps}
          setFieldValue={setFieldValue}
          name='max_color_hex_code'
          data={mapData(values.min_color_hex_code)}
          label={t('Maximum rang')}
          placeholder={t('Maximum rang')}
        />
      </div>
      <div className='mt-5 flex justify-end'>
        <Button
          loading={isPending}
          onClick={() => {
            mutate(
              {
                url: '/color/select-default',
                data: {
                  ...values,
                  color_type_id: +values.color_type_id,
                },
              },
              {
                onSuccess: () => {
                  toast.success(t('Saved'));
                },
                onError: () => {
                  toast.error(t('Something went wrong'));
                },
              },
            );
          }}
        >
          <span>{t('Save')}</span>
        </Button>
      </div>
    </ContentBox>
  );
};
