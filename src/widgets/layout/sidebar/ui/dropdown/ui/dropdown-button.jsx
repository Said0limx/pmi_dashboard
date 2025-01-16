'use client';

import { useTranslations } from 'next-intl';

import { Down, SquaresFour } from '@/assets/icons';

export const DropdownButton = ({ icon, isClicked, onClick, title }) => {
  const t = useTranslations();
  return (
    <li
      className='group w-full h-[36px] flex pl-[16px] cursor-pointer justify-between items-center group-[.active]:bg-main_pale_cyan hover:bg-main_pale_cyan dark:hover:bg-main_blue_3 dark:group-[.active]:bg-main_blue_3 '
      onClick={onClick}
    >
      <div className='w-full flex items-center gap-[12px]'>
        <div className='w-[18px] h-[18px] flex items-center justify-center'>
          {icon || <SquaresFour />}
        </div>
        <div className='group-hover:text-main_deep_blue text-main_light_slate_blue  group-[.active]:text-main_deep_blue dark:!text-white text-sm font-bold'>
          {t(title)}
        </div>
      </div>

      <div
        className={`flex w-5 h-5 ${isClicked ? '' : 'rotate-[180deg]'}  py-1 justify-center gr items-center mr-5`}
      >
        <Down />
      </div>
    </li>
  );
};
