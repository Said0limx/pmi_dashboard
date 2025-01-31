import { useFetch } from '@/shared/hooks';

export const useGetAssignColorsList = () => {
  return useFetch({
    key: '/assign/color-list',
    url: '/assign/color-list',
    method: 'POST',
  });
};
