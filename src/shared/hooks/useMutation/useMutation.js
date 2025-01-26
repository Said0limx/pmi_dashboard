'use client';

import { useMutation as tanstackUseMutation } from '@tanstack/react-query';

import { api } from '@/shared';

async function poster({ url, params, method = 'POST', data = {} }) {
  const res = await api({
    url,
    data,
    params,
    method,
  });

  return res.data;
}

export const useMutation = () => {
  return tanstackUseMutation({
    mutationFn: poster,
  });
};
