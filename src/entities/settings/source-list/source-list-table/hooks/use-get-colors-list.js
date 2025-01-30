import { useFetch } from '@/shared/hooks';

export const useGetSourceList = ({ params }) => {
  return useFetch({
    key: '/source/list',
    url: '/source/list',
    params,
  });
};
