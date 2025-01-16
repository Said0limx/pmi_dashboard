'use client';
import { useToggle } from '@mantine/hooks';

import { checkPartOfPathname } from '../../model/checkPartOfPathname';
import { DropdownButton } from './ui/dropdown-button';
import { DropdownNavLinks } from './ui/dropdown-nav-links';
export const DropDownMenu = ({ data: itemData, pathname }) => {
  const [active, toggle] = useToggle();
  return (
    <ul className={`w-full flex flex-col items-start gap-2`}>
      <DropdownButton
        onClick={toggle}
        isClicked={active}
        icon={
          <itemData.icon
            width={24}
            height={24}
            className={`group-hover/:text-main_deep_blue dark:group-hover/:text-white ${checkPartOfPathname(itemData.path, pathname) || active ? 'text-main_deep_blue dark:text-white' : 'text-main_light_slate_blue'}`}
          />
        }
        title={itemData.title}
      />

      <DropdownNavLinks data={itemData.children} pathname={pathname} active={active} />
    </ul>
  );
};
