'use client';
import { useAuthStore } from '@/shared/store/use-auth-store';

const AuthProvider = ({ children }) => {
  const { authenticated, isLoading } = useAuthStore();
  if (isLoading) {
    return (
      <div className='flex items-center justify-center text-4xl fixed w-full h-full'>
        Loading...
      </div>
    );
  }
  if (authenticated) {
    return <div>{children}</div>;
  }
  return null;
};

export default AuthProvider;
