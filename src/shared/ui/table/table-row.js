export const TableRow = ({ className = '', children, onClick = () => {} }) => {
  return (
    <tr onClick={onClick} className={`${className}`}>
      {children}
    </tr>
  );
};
