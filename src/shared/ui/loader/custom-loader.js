import { Loader } from '@/shared/ui';

export const CustomLoader = ({ isLoading }) => {
  if (isLoading)
    return (
      <div className='h-full flex justify-center items-center'>
        <Loader />
      </div>
    );
  return null;
};
