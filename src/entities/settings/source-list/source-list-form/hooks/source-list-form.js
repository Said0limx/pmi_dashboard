import { useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

export const useSourceForm = (close, data) => {
  const queryClient = useQueryClient();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      title_uz: '',
      title_ru: '',
      title_oz: '',
      title_en: '',
      color: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues({
        title_uz: data?.title_uz,
        title_ru: data?.title_ru,
        title_oz: data?.title_oz,
        title_en: data?.title_en,
        color: data?.color,
      });
    }
  }, [data]);

  const { mutate } = useMutation();

  const handleSubmit = (values) => {
    mutate(
      {
        url: `/source/edit/${data?.id}`,
        data: values,
        method: 'PUT',
      },
      {
        onSuccess: () => {
          close();
          form.reset();
          toast.success('Source updated');
          queryClient.invalidateQueries({ queryKey: ['/source/list'] });
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
