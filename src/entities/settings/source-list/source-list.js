import { useModal } from '@/shared/hooks';

import { SourceListForm } from './source-list-form/source-list-form';
import SourceListHeader from './source-list-header';
import SourceListTable from './source-list-table/source-list-table';

const SourceList = () => {
  const { modal: formModal, openWithData: openEditModal, close: closeFormModal } = useModal();
  return (
    <div>
      <SourceListHeader />
      <SourceListForm open={formModal.opened} close={closeFormModal} data={formModal.data} />

      <SourceListTable openEditModal={openEditModal} />
    </div>
  );
};

export default SourceList;
