import { Modal } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useSourceForm } from './hooks/source-list-form';
import { ActionButtons } from './ui/action-buttons';
import FormFields from './ui/form-fields';

export const SourceListForm = ({ data, close, open }) => {
  const { getInputProps, handleSubmit, key, reset } = useSourceForm(close, data);

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
