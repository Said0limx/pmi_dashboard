import { useFetch } from '@/shared/hooks';

export const useGetColorsFieldList = ({ params }) => {
  return useFetch({
    key: '/color-field/list',
    url: '/color-field/list',
    params,
  });
};
