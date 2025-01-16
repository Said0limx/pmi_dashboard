import { Modal } from '@mantine/core';
import { useTranslations } from 'next-intl';

import CatalogForm from '../catalog/catalog-form';

const ModalForm = ({ opened, close, selected, setSelected, url, listKey }) => {
  const t = useTranslations();
  return (
    <Modal opened={opened} onClose={close} title={t('Translations')} centered size={'xl'}>
      <CatalogForm
        className={'grid-cols-1'}
        listKey={listKey}
        selected={selected}
        setSelected={setSelected}
        url={url}
        onSuccess={close}
      />
    </Modal>
  );
};

export default ModalForm;
