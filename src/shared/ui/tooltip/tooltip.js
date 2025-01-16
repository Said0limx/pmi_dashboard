export const Tooltip = ({ text, position = 'top', children, lineColor = '#FFF' }) => {
  return (
    <div className='relative flex items-center'>
      {children}
      <div
        className={`absolute whitespace-nowrap bg-gray-700 text-white text-xs rounded py-1 px-2 z-10 
            ${position === 'top' ? 'bottom-full mb-1' : ''}
            ${position === 'bottom' ? 'top-full mt-1' : ''}
            ${position === 'left' ? 'right-full mr-1' : ''}
            ${position === 'right' ? 'left-full ml-1' : ''}
            opacity-0 hover:opacity-100 transition-opacity duration-200`}
      >
        {text}
        {/* Line Connector */}
        <svg
          className={`absolute ${
            position === 'top' ? 'bottom-0 left-1/2 transform -translate-x-1/2' : ''
          } ${position === 'bottom' ? 'top-0 left-1/2 transform -translate-x-1/2' : ''} ${
            position === 'left' ? 'right-0 top-1/2 transform -translate-y-1/2' : ''
          } ${position === 'right' ? 'left-0 top-1/2 transform -translate-y-1/2' : ''}`}
          width='10'
          height='10'
          viewBox='0 0 10 10'
        >
          <line x1='0' y1='0' x2='10' y2='10' stroke={lineColor} strokeWidth='2' />
        </svg>
      </div>
    </div>
  );
};
