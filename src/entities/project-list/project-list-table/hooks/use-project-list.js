import { useFetch } from '@/shared/hooks';

export const useGetProjectList = ({ body }) => {
  return useFetch({
    key: '/project/list',
    url: '/project/list',
    method: 'POST',
    body,
  });
};
