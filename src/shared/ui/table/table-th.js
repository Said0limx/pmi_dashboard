export const TableTh = ({
  children,
  className = '',
  align = 'left',
  rowSpan = 1,
  colSpan = 1,
  ...props
}) => {
  return (
    <th
      align={align}
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={`p-[10px] text-sm leading-6 font-bold text-color bg-main_deep_gray dark:bg-main_deep_blue dark:border-main_blue_2 tracking-tightest  ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};
