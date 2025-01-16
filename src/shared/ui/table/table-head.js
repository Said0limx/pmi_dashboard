export const TableHead = ({ children, className = '' }) => {
  return <thead className={`${className}`}>{children}</thead>;
};
