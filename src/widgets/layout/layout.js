import { ContentTopIcon } from '@/assets/icons';

import Header from './header/header';
import { Sidebar } from './sidebar/sidebar';
// import SidebarToggle from './sidebar-toggle/sidebar-toggle';

const MainLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className='relative w-[calc(100%-250px)] ml-auto'>
        <div className='absolute top-0 -left-36 -z-10'>
          <ContentTopIcon />
        </div>
        <div className='flex items-center px-5 gap-5 pt-3'>
          {/* <SidebarToggle />  */}
          <Header />
        </div>
        <div className='p-5'>{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
