import { classNames } from '@/shared/utils';

const CustomTableThead = ({ theadColumns = [] }) => {
  return (
    <thead className='table-header-group'>
      {theadColumns.map((theadRow, rowIndex) => (
        <tr key={theadRow.key ?? rowIndex}>
          {theadRow.children.map((child, childIndex) => {
            const { key, rowSpan, colSpan, title, className = '', render, align = 'left' } = child;

            const thClasses = classNames(
              'p-[10px] text-sm leading-6 font-medium text-main_cool_gray tracking-tightest bg-main_thin_white',
              rowIndex === theadColumns.length - 1 ? 'last:rounded-br-xl' : '',
              rowIndex === 0 ? 'first:rounded-tl-xl first:rounded-bl-xl last:rounded-tr-xl' : '',
              className,
            );

            return (
              <th
                key={key ?? childIndex}
                rowSpan={rowSpan}
                colSpan={colSpan}
                className={thClasses}
                align={align}
              >
                {render ? render(child, title, childIndex, key) : title}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default CustomTableThead;
