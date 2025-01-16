'use client';
import { useAuthStore } from '@/shared/store/use-auth-store';

const UserDetail = () => {
  const { userDetails } = useAuthStore();
  return userDetails?.authority_id === 1 ? null : (
    <div className='text-color text-[1.25rem] font-bold'>{userDetails?.title}</div>
  );
};

export default UserDetail;
