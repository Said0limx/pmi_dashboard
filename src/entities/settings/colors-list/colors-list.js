import { useQueryClient } from '@tanstack/react-query';

import { DeleteItem } from '@/features/delete-item/delete-item';
import { useModal } from '@/shared/hooks';

import { ColorsListForm } from './colors-list-form/colors-list-form';
import ColorsListHeader from './colors-list-header';
import ColorsListTable from './colors-list-table/colors-list-table';

const ColorsList = () => {
  const { modal: deleteModal, open: openDeleteModal, close: closeDeleteModal } = useModal();
  const {
    modal: formModal,
    open: openFormModal,
    openWithData: openEditModal,
    close: closeFormModal,
  } = useModal();
  const queryClient = useQueryClient();
  return (
    <div>
      <ColorsListHeader openCreateModal={openFormModal} />
      <DeleteItem
        url={`/color/delete/${deleteModal.id}`}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['color/list'] });
        }}
        opened={deleteModal.opened}
        close={closeDeleteModal}
      />
      <ColorsListForm open={formModal.opened} close={closeFormModal} data={formModal.data} />

      <ColorsListTable openDeleteModal={openDeleteModal} openEditModal={openEditModal} />
    </div>
  );
};

export default ColorsList;
