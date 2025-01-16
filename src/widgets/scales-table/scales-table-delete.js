import { ActionIcon, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

const ScalesTableDelete = ({ id, onSuccess }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending } = useMutation();
  const t = useTranslations();
  const onError = (error) => {
    error.response?.data?.data?.map((item) => {
      toast.error(item.message);
    });
    if (!error.response?.data?.data?.length)
      toast.error(error.response?.data?.message || t('Something went wrong'));
  };
  return (
    <div>
      <ActionIcon variant='outline' color='red' onClick={open}>
        <IconTrash size={18} stroke={1.5} />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{ title: '!font-semibold' }}
        title='Delete executor'
        size={'sm'}
      >
        <div>{t("Haqiqatdan ham o'chirishni hohlaysizmi")}</div>
        <div className='flex justify-end gap-2 mt-5'>
          <Button type='button' color='red' onClick={close} disabled={isPending}>
            {t('Bekor qilish')}
          </Button>
          <Button
            onClick={() =>
              mutate(
                { url: `/admin/scales-table/delete/${id}`, method: 'DELETE' },
                {
                  onSuccess: () => {
                    close();
                    onSuccess?.();
                    toast.success(t('Scale deleted'));
                  },
                  onError,
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
    </div>
  );
};

export default ScalesTableDelete;
