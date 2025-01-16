export const Table = ({ children, className = '' }) => {
  return <table className={`${className} w-full`}>{children}</table>;
};
