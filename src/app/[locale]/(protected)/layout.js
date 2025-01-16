'use client';
import { useUserDetails } from '@/shared/api-hooks';
import MainLayout from '@/widgets/layout/layout';

function Layout({ children }) {
  useUserDetails();
  return <MainLayout>{children}</MainLayout>;
}

export default Layout;
