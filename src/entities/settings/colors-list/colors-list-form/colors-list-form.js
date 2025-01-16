import { Modal } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useColorsForm } from './hooks/use-colors-form';
import { ActionButtons } from './ui/action-buttons';
import FormFields from './ui/form-fields';

export const ColorsListForm = ({ data, close, open }) => {
  const { getInputProps, handleSubmit, key, reset } = useColorsForm(close, data);

  const t = useTranslations();

  return (
    <Modal
      opened={open}
      onClose={close}
      size={'60%'}
      title={data?.id ? t('Update color') : t('Create color')}
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
