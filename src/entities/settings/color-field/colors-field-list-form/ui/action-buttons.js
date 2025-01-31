import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const ActionButtons = ({ close }) => {
  const t = useTranslations();
  return (
    <div className='flex gap-2 mt-5 justify-end'>
      <Button type='button' color='red' variant='outline' onClick={close}>
        {t('Cancel')}
      </Button>
      <Button type='submit' variant='outline'>
        {t('Save')}
      </Button>
    </div>
  );
};
