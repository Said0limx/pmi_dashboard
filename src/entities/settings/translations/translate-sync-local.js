import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

const TranslateSyncLocal = () => {
  const { mutate } = useMutation();
  const t = useTranslations();
  return (
    <Button
      onClick={() =>
        mutate(
          { url: '/admin/language-translate/sync-local', method: 'GET' },
          {
            onSuccess: () => {
              toast.success('Synced');
            },
            onError: (error) => {
              toast.error(error.response?.data?.message || 'Something went wrong');
            },
          },
        )
      }
    >
      {t('Sync local')}
    </Button>
  );
};

export default TranslateSyncLocal;
