import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useColorfieldsList, useColorsList } from '@/shared/api-hooks';
import { useMutation } from '@/shared/hooks';

export const useAssignColorsForm = (close, data) => {
  const queryClient = useQueryClient();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      field_id: '',
      color_id: '',
    },
  });

  const { data: colorsList = [] } = useColorsList({
    params: { color_type_id: 1 },
  });
  const { data: colorFileds = [] } = useColorfieldsList();

  useEffect(() => {
    if (data) {
      if (colorsList) {
        form.setFieldValue('color_id', String(data?.color_id));
      } else;
      if (colorFileds) {
        form.setFieldValue('field_id', String(data?.field_id));
      }
    }
  }, [data, colorsList, colorFileds]);

  const { mutate } = useMutation();
  const handleSubmit = (values) => {
    mutate(
      {
        url: data?.id ? `/assign/edit-color-field/${data?.id}` : '/assign/field-color',
        data: values,
        method: data?.id ? 'PUT' : 'POST',
      },
      {
        onSuccess: () => {
          close();
          form.reset();
          toast.success(data?.id ? 'Color updated' : 'Color created');
          queryClient.invalidateQueries({ queryKey: ['/assign/color-list'] });
        },
        onError: (error) => {
          error.response?.data?.data?.map((item) => {
            toast.error(item.message);
          });
        },
      },
    );
  };
  return { ...form, handleSubmit: form.onSubmit(handleSubmit), colorFileds, colorsList };
};
