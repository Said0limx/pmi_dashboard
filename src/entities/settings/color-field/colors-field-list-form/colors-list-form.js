import { Modal } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useColorsFieldForm } from './hooks/use-colors-form';
import { ActionButtons } from './ui/action-buttons';
import FormFields from './ui/form-fields';

export const ColorsFieldListForm = ({ data, close, open }) => {
  const { getInputProps, handleSubmit, key, reset } = useColorsFieldForm(close, data);

  const t = useTranslations();
  useEffect(() => {
    if (!open) reset();
  }, [open]);
  return (
    <Modal
      opened={open}
      onClose={close}
      size={'60%'}
      title={data?.id ? t('Update color field') : t('Create color field')}
      centered
    >
      <form onSubmit={handleSubmit}>
        <FormFields getInputProps={getInputProps} formKey={key} />
        <ActionButtons
          close={() => {
            close();
            reset();
          }}
        />
      </form>
    </Modal>
  );
};
