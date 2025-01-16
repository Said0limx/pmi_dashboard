import { SortAscendIcon, SortDescendIcon } from '@/assets/icons';

export const SortIcons = ({ sortType }) => {
  return { asc: <SortAscendIcon />, desc: <SortDescendIcon /> }[sortType] ?? null;
};
