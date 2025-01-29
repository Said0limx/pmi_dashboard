'use client';
import { useComputedColorScheme } from '@mantine/core';
import { usePathname } from 'next/navigation';

import { Logo } from '@/assets/icons';
import { Link } from '@/i18n/routing';

import { sidebarList } from './lib/sidebar-data';
import { checkPathMatch } from './model/checkPathname';
import { DropDownMenu, NavLink } from './ui';

export const Sidebar = () => {
  const pathname = usePathname();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <div className='sidebar w-[250px] max-w-[290px] max-h-screen h-screen bg-white dark:bg-main_blue_5 text-white float-left sticky top-0'>
      <div className='w-full'>
        <div className='px-[27px] py-4 flex items-center '>
          <Link href={`/`} className='text-center h-[60px] w-auto' aria-label='Main logo'>
            <Logo color={computedColorScheme === 'light' ? '#2b3674' : '#fff'} />
          </Link>
        </div>
      </div>
      <div className='w-full h-[1px]  bg-main_lavenderMistAlt dark:bg-main_Blue8' />
      <ul className='w-full inline-flex flex-col items-start gap-[8px] list-none mt-[20px] sidebar-menu '>
        {sidebarList().map((item) => {
          if (item?.type === 'page') {
            return (
              <li
                key={item.id}
                className={`text-black w-full group ${checkPathMatch(item.path, pathname) ? 'active' : ''}`}
              >
                <NavLink
                  title={item.title}
                  href={checkPathMatch(item.path, pathname) ? '' : `/${item.path}`}
                  icon={
                    <item.icon
                      width={24}
                      height={24}
                      className={`group-hover/:text-main_deep_blue dark:group-hover/:text-white ${checkPathMatch(item.path, pathname) ? 'text-main_deep_blue dark:text-white' : 'text-main_light_slate_blue'}`}
                    />
                  }
                />
              </li>
            );
          } else {
            return (
              <li key={item.id} className={`text-black w-full `}>
                <DropDownMenu data={item} pathname={pathname} />
              </li>
            );
          }
        })}
      </ul>
      {/* <div className='absolute bottom-0 left-0 -z-10'>
        <SidebarBottomIcon />
      </div> */}
    </div>
  );
};
