import { useQueryClient } from '@tanstack/react-query';

import { DeleteItem } from '@/features/delete-item/delete-item';
import { useModal } from '@/shared/hooks';

import { ColorsFieldListForm } from './colors-field-list-form/colors-list-form';
import ColorsFieldListHeader from './colors-field-list-header';
import ColorsFieldListTable from './colors-field-list-table/colors-field-list-table';

const ColorsFieldList = () => {
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
      <ColorsFieldListHeader openCreateModal={openFormModal} />
      <DeleteItem
        url={`/color-field/delete/${deleteModal.id}`}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['/color-field/list'] });
        }}
        opened={deleteModal.opened}
        close={closeDeleteModal}
      />
      <ColorsFieldListForm open={formModal.opened} close={closeFormModal} data={formModal.data} />

      <ColorsFieldListTable openDeleteModal={openDeleteModal} openEditModal={openEditModal} />
    </div>
  );
};

export default ColorsFieldList;
