import { useMounted } from '@mantine/hooks';

import MainFilter from '@/entities/main-filter/main-filter';
import { useFilterToggleStore } from '@/shared/store/use-filter-toggle-store';
import { ContentBox } from '@/shared/ui';

const PageLayout = ({ children }) => {
  const { opened } = useFilterToggleStore();

  const mounted = useMounted();
  // Condition checks
  if (!mounted) {
    return null;
  }
  return (
    <div className='flex gap-4 h-[85vh]'>
      <ContentBox
        className={`transition-all p-5 duration-500 overflow-hidden ${opened ? 'w-[calc(100%-290px)]' : 'w-full'}`}
      >
        {children}
      </ContentBox>
      <MainFilter />
    </div>
  );
};

export default PageLayout;
