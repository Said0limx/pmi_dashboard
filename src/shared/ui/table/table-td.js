export const TableTd = ({
  children,
  className = '',
  align = 'left',
  rowSpan = 1,
  colSpan = 1,
  onClick = () => {},
  ...props
}) => {
  return (
    <td
      {...props}
      align={align}
      rowSpan={rowSpan}
      colSpan={colSpan}
      onClick={onClick}
      className={`p-[10px] text-sm font-bold leading-6 text-color bg-color dark:border-main_blue_2 tracking-tightest ${className}`}
    >
      {children}
    </td>
  );
};
