import { classNames } from '@/shared/utils';

const CustomTableTbody = ({ data, dataKey, rowClassName, columns }) => {
  return (
    <tbody className='table-row-group'>
      {data.map((row, rowIndex) => (
        <tr key={row[dataKey]} className={rowClassName}>
          {columns.map((column) => {
            const {
              dataIndex,
              colSpan,
              rowSpan,
              align,
              className: tdClassName = '',
              render,
            } = column;

            const tdClasses = classNames(
              'p-[10px] text-[#2B3674] text-sm leading-6 font-bold',
              tdClassName,
            );

            return (
              <td
                key={dataIndex}
                colSpan={colSpan}
                rowSpan={rowSpan}
                align={align}
                className={tdClasses}
              >
                {render ? render(row, rowIndex, data) : row[dataIndex]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default CustomTableTbody;
