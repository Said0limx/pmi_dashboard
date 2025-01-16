'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useMemo } from 'react';

export const useUrlParams = () => {
  const { push, isReady } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const location = useMemo(() => {
    try {
      return window.location;
    } catch (e) {
      return {
        host: '',
        origin: '',
      };
    }
  }, []);

  const getParam = (name) => {
    return searchParams.get(name);
  };
  const obj = {};
  const params = queryString.parse(searchParams.toString());

  const setParam = (name, value) => {
    // push(pathname + '?' + createQueryString({ ...params, [name]: value }), { scroll: true });
    obj[name] = value;
  };

  const removeParam = (name) => {
    delete params[name];
    push(pathname + '?' + queryString.stringify(params));
  };

  return {
    getParam,
    setParam,
    location,
    isReady,
    removeParam,
  };
};
