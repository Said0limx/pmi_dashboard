export const ContentBox = ({ className = 'p-5', children, style = {} }) => {
  return (
    <div
      className={`${className} after:rounded-[1.25rem] rounded-[1.25rem] relative after:absolute after:inset-0 after:bg-content_box_bg dark:after:bg-main_blue_5 after:-z-10 shadow-[2px_3px_7.9px_1px_#0000000A]`}
      style={style}
    >
      {children}
    </div>
  );
};
