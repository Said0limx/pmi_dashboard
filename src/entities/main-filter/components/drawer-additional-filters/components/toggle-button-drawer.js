import { IconSettings } from '@tabler/icons-react';

export const ToggleButtonDrawer = ({ toggle }) => {
  return (
    <div className='flex-1 flex gap-4 items-start'>
      <button
        onClick={toggle}
        className='w-[2.625rem] h-[2.625rem] relative z-50 flex items-center cursor-pointer justify-center shrink-0 rounded-md overflow-hidden bg-white dark:bg-main_blue_3'
        aria-label='user-settings'
      >
        <IconSettings className='text-main_medium_blue dark:text-white' />
      </button>
    </div>
  );
};
