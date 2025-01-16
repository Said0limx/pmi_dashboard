'use client';
import cookies from 'js-cookie';

import { Logout } from '@/assets/icons';
import { useAuthStore } from '@/shared/store/use-auth-store';

export const Avatar = () => {
  const logOut = () => {
    useAuthStore.getState().setUserDetails(null);
    cookies.remove('access-token');
    window.location.reload();
  };
  return (
    <button
      onClick={logOut}
      className='w-[2.625rem] h-[2.625rem] relative flex items-center cursor-pointer justify-center shrink-0 rounded-md overflow-hidden bg-color '
      aria-label='user-settings'
    >
      <Logout />
    </button>
  );
};
