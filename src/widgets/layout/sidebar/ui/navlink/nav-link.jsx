import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

export const NavLink = ({ href, icon, title }) => {
  const t = useTranslations();
  return (
    <Link
      href={href}
      className='group/navLink w-full h-[36px] flex pl-[16px] justify-between items-center
      group-[.active]:bg-main_pale_cyan hover:bg-main_pale_cyan hover:dark:bg-main_blue_3
      dark:group-[.active]:bg-main_blue_3 '
      aria-label={title}
    >
      <div className='w-full flex items-center gap-[12px]'>
        <div className='w-[20px] h-[20px] flex items-center justify-center'>{icon}</div>
        <div className='group-hover/navLink:text-main_deep_blue text-main_light_slate_blue  group-[.active]:text-main_deep_blue dark:!text-white text-sm font-bold'>
          {t(title)}
        </div>
      </div>
      <div className='w-[4px] h-full shrink-0 rounded-l-[25px] group-hover/navLink:bg-main_medium_blue dark:group-hover/navLink:bg-white group-[.active]:bg-main_medium_blue dark:group-[.active]:bg-white ' />
    </Link>
  );
};
