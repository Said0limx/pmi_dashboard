import { Button, Modal } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

export const DeleteItem = ({
  url,
  onSuccess,
  onError,
  message,
  successMessage,
  errorMessage,
  method = 'DELETE',
  opened,
  close,
  data,
}) => {
  const { mutate, isPending } = useMutation();

  const t = useTranslations();
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      classNames={{ title: '!font-semibold' }}
      title={t('Delete')}
      size={'sm'}
    >
      <div>{message || t("Haqiqatdan ham o'chirishni hohlaysizmi")}</div>
      <div className='flex justify-end gap-2 mt-5'>
        <Button type='button' color='red' onClick={close} disabled={isPending}>
          {t('Bekor qilish')}
        </Button>
        <Button
          onClick={() =>
            mutate(
              { url: url, method: method, data },
              {
                onSuccess: () => {
                  close();
                  onSuccess?.();
                  toast.success(successMessage || 'Item deleted successfully');
                },
                onError: (error) => {
                  error.response?.data?.data?.map((item) => {
                    toast.error(errorMessage || item.message);
                  });
                  onError?.();
                },
              },
            )
          }
          loading={isPending}
          disabled={isPending}
        >
          {t("O'chirish")}
        </Button>
      </div>
    </Modal>
  );
};
