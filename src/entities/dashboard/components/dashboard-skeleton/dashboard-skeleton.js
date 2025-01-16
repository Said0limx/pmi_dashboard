import { Skeleton } from '@mantine/core';

const DashboardSkeleton = () => {
  return (
    <div className={'flex flex-col gap-5'}>
      <div className='grid grid-cols-2 gap-5 '>
        <Skeleton height={676} className={'skeleton'} radius={'12'} />
        <div>
          <div className='grid grid-cols-2 gap-5 mb-5'>
            <Skeleton height={350} className={'skeleton'} radius={'12'} />
            <Skeleton height={350} className={'skeleton'} radius={'12'} />
          </div>
          <Skeleton height={306} className={'skeleton'} radius={'12'} />
        </div>
      </div>
      <div className='grid screen-1800:grid-cols-2 gap-5'>
        <Skeleton height={457} className={'skeleton'} radius={'12'} />
        <Skeleton height={457} className={'skeleton'} radius={'12'} />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
