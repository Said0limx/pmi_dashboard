import { useFetch } from '@/shared/hooks';

export const useGetColorsList = ({ params }) => {
  return useFetch({
    key: 'color/list',
    url: '/color/list',
    params,
  });
};
