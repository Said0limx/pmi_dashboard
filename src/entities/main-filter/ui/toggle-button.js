import { IconChevronsLeft } from '@tabler/icons-react';
import { motion } from 'framer-motion';
export const ToggleButton = ({ opened, toggle }) => {
  return (
    <motion.button
      className='bg-white dark:bg-main_blue_5 h-max rounded rounded-r-none fixed right-0 top-[115px] p-2 z-30'
      onClick={toggle}
      initial={!opened}
      animate={opened ? { opacity: 0, right: -150 } : { opacity: 1, right: 0 }}
    >
      <IconChevronsLeft />
    </motion.button>
  );
};
