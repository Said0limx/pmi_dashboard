'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { api } from '@/shared';

async function fetcher({ queryKey }) {
  const { url, params, method, body, onSuccess, dataKey = 'data' } = queryKey[1];
  const res = await api({
    url,
    data: body,
    params,
    method,
  });

  onSuccess?.(res.data);
  if (dataKey) return res.data[dataKey];
  return res.data;
}

export const useFetch = ({
  key,
  url,
  params = {},
  method = 'GET',
  body = {},
  queryOptions = {},
  dataKey,
  onSuccess,
}) => {
  const { locale } = useParams();
  return useQuery({
    queryKey: [key, { url, params, method, body, dataKey, onSuccess }, locale],
    queryFn: fetcher,
    ...queryOptions,
  });
};
