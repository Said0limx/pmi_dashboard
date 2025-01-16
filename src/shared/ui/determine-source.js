'use client';
import { useSourceList } from '../api-hooks/main-filter';
import { useFilterStore } from '../store/use-filter-store';

export const DetermineSource = () => {
  const { source_id } = useFilterStore();
  const { data = [] } = useSourceList();

  const source = data?.find((source) => source.id === source_id);
  if (!source) return null;
  return (
    <div className='text-lg text-main_deep_blue dark:text-white'>
      <span className='font-bold'>Manba:</span> {source?.title}
    </div>
  );
};
