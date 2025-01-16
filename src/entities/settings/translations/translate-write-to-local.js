import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { useMutation } from '@/shared/hooks';

const TranslateWriteLocal = () => {
  const { mutate } = useMutation();
  const t = useTranslations();
  return (
    <Button
      onClick={() =>
        mutate(
          { url: '/admin/language-translate/write', method: 'GET' },
          {
            onSuccess: () => {
              toast.success('Wrote');
            },
            onError: (error) => {
              toast.error(error.response?.data?.message || 'Something went wrong');
            },
          },
        )
      }
    >
      {t('Write to local')}
    </Button>
  );
};

export default TranslateWriteLocal;
