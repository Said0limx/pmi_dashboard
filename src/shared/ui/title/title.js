export const Title = ({ children = '', className = '', size = 'lg' }) => {
  return (
    <div className={`${className} tracking-tighter text-2xl leading-8 text-color font-bold`}>
      {children}
    </div>
  );
};
