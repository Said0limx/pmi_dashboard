import { useFetch } from '@/shared/hooks';

export const useGetColorsList = () => {
  return useFetch({
    key: 'admin/color/list',
    url: '/admin/color/list',
  });
};
