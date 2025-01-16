import { motion } from 'framer-motion';

import { checkPathMatch } from '@/widgets/layout/sidebar/model/checkPathname';

import { NavLink } from '../../navlink/nav-link';

export const DropdownNavLinks = ({ data, pathname, active }) => {
  return data.map((item, index) => {
    return (
      <motion.li
        initial={active}
        animate={{
          opacity: active ? 1 : 0,
          visibility: active ? 'visible' : 'hidden',
          x: active ? 0 : -25 * index,
          transition: { duration: 0.03 * index },
        }}
        className={`text-black w-full group ${checkPathMatch(item.path, pathname) ? 'active' : ''}`}
        key={item.id}
      >
        <NavLink
          active={checkPathMatch(item.path, pathname)}
          title={item.title}
          href={checkPathMatch(item.path, pathname) ? '' : `${item.path}`}
          icon={
            <item.icon
              width={24}
              height={24}
              className={`group-hover/:text-main_deep_blue dark:group-hover/:text-white ${checkPathMatch(item.path, pathname) ? 'text-main_deep_blue dark:text-white' : 'text-main_light_slate_blue'}`}
            />
          }
        />
      </motion.li>
    );
  });
};
