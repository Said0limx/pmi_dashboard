import { Loader } from '../loader';

export const LoadingOverlay = ({ children, isLoading, className }) => {
  return (
    <div className={`relative rounded-[1.25rem] overflow-hidden ${className}`}>
      {isLoading && (
        <div className='absolute top-0 z-10 left-0 w-full h-full flex justify-center items-center bg-slate-100  dark:bg-main-blue bg-opacity-50'>
          <Loader />
        </div>
      )}

      {children}
    </div>
  );
};
