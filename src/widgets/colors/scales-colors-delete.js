import { ActionIcon, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

const ScalesNumberDelete = ({ id, onSuccess }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, isPending } = useMutation();

  const onError = (error) => {
    error.response?.data?.data?.map((item) => {
      toast.error(item.message);
    });
    if (!error.response?.data?.data?.length)
      toast.error(error.response?.data?.message || 'Something went wrong');
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
        title='Delete scale color '
        size={'sm'}
      >
        <div>Haqiqatdan ham o'chirishni hohlaysizmi</div>
        <div className='flex justify-end gap-2 mt-5'>
          <Button type='button' color='red' onClick={close} disabled={isPending}>
            Bekor qilish
          </Button>
          <Button
            onClick={() =>
              mutate(
                { url: `/admin/scales-color/delete/${id}`, method: 'DELETE' },
                {
                  onSuccess: () => {
                    close();
                    onSuccess?.();
                    toast.success('Scale color deleted');
                  },
                  onError,
                },
              )
            }
            loading={isPending}
            disabled={isPending}
          >
            O'chirish
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ScalesNumberDelete;
