import { Modal } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useAssignColorsForm } from './hooks/use-assign-colors-form';
import { ActionButtons } from './ui/action-buttons';
import FormFields from './ui/form-fields';

export const AssignColorsListForm = ({ data, close, open }) => {
  const { getInputProps, handleSubmit, key, reset, setFieldValue, colorFileds, colorsList } =
    useAssignColorsForm(close, data);

  const t = useTranslations();
  useEffect(() => {
    if (!open) reset();
  }, [open]);
  return (
    <Modal
      opened={open}
      onClose={close}
      size={'50%'}
      title={data?.id ? t('Update color') : t('Create color')}
      centered
    >
      <form onSubmit={handleSubmit}>
        <FormFields
          getInputProps={getInputProps}
          formKey={key}
          setFieldValue={setFieldValue}
          colorFileds={colorFileds}
          colorsList={colorsList}
        />
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
