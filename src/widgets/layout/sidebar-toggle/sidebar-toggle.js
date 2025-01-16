import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';

const SidebarToggle = ({ toggle, active }) => {
  return (
    <div className='w-8 h-8 border flex justify-center items-center rounded-lg'>
      <IconLayoutSidebarLeftExpand />
    </div>
  );
};

export default SidebarToggle;
