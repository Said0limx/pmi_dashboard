import { classNames } from '@/shared/utils';

export const TableContainer = ({ children, className }) => {
  const style = classNames('overflow-auto rounded-xl border dark:border-main_blue_2', className);
  return <div className={style}>{children}</div>;
};
