import { useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/shared';

const fetchProjects = async ({ pageParam = 1, queryKey }) => {
  const { url, params, body = {} } = queryKey[1];
  const res = await api({
    url,
    method: 'POST',
    data: body,
    params: { ...params, page: pageParam },
  });
  const newData = {
    ...res?.data,
    // data: res?.data?.data,
    // next: res?.data?.next_page_url,
    // previous: res?.data?.first_page_url,
  };
  return newData;
};
export const useGetInfiniteScroll = ({ name, url, params, body, queryOptions = {} }) => {
  return useInfiniteQuery({
    queryKey: [`${name}`, { url, params, body }],
    queryFn: fetchProjects,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.current_page < lastPage.meta.pages_count
        ? lastPage.meta.current_page + 1
        : null;
    },
    ...queryOptions,
  });
};
