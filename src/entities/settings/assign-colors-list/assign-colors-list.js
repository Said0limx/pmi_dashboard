import { useModal } from '@/shared/hooks';

import { AssignColorsListForm } from './assign-colors-list-form/assign-colors-list-form';
import AssignColorsListHeader from './assign-colors-list-header';
import AssignColorsListTable from './assign-colors-list-table/assign-colors-list-table';

const AssignColorsList = () => {
  const { open: openDeleteModal } = useModal();
  const {
    modal: formModal,
    open: openFormModal,
    openWithData: openEditModal,
    close: closeFormModal,
  } = useModal();
  return (
    <div>
      <AssignColorsListHeader openCreateModal={openFormModal} />
      <AssignColorsListForm open={formModal.opened} close={closeFormModal} data={formModal.data} />

      <AssignColorsListTable openDeleteModal={openDeleteModal} openEditModal={openEditModal} />
    </div>
  );
};

export default AssignColorsList;
