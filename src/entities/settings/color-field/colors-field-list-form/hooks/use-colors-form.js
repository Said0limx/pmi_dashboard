import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

export const useColorsFieldForm = (close, data) => {
  const queryClient = useQueryClient();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      title_uz: '',
      title_ru: '',
      title_oz: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        title_uz: data?.title_uz,
        title_ru: data?.title_ru,
        title_oz: data?.title_oz,
      });
    }
  }, [data]);

  const { mutate } = useMutation();
  const handleSubmit = (values) => {
    mutate(
      {
        url: data?.id ? `/color-field/edit/${data?.id}` : '/color-field/create',
        data: values,
        method: data?.id ? 'PUT' : 'POST',
      },
      {
        onSuccess: () => {
          close();
          form.reset();
          toast.success(data?.id ? 'Color field updated' : 'Color field created');
          queryClient.invalidateQueries({ queryKey: ['/color-field/list'] });
        },
        onError: (error) => {
          error.response?.data?.data?.map((item) => {
            toast.error(item.message);
          });
        },
      },
    );
  };
  return { ...form, handleSubmit: form.onSubmit(handleSubmit) };
};
