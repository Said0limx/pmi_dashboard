import { Skeleton } from '@mantine/core';

const TableSkeleton = () => {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='grid grid-cols-4 gap-2  mt-2 first:mb-4'>
            <Skeleton height={35} radius='sm' />
            <Skeleton height={35} radius='sm' />
            <Skeleton height={35} radius='sm' />
            <Skeleton height={35} radius='sm' />
          </div>
        ))}
    </>
  );
};

export default TableSkeleton;
