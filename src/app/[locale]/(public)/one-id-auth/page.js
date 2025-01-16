'use client';

import { Loader } from '@mantine/core';
import cookies from 'js-cookie';
import { use, useEffect, useState } from 'react';

import { useRouter } from '@/i18n/routing';
import { api } from '@/shared';

export default function OneIdAuth(props) {
  const searchParams = use(props.searchParams);
  const state = 'situation_panel_state';
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (state === searchParams.state) {
      const auth = async () => {
        try {
          const { data } = await api.post('auth/login-by-one-id', { code: searchParams.code });
          cookies.set('access-token', data.data.access_token);
          router.push('/');
        } catch (e) {
          alert(
            'Something went wrong',
            JSON.stringify(e.response?.data || e.response?.message || e.message),
          );
          router.push('/login');
        } finally {
          setIsLoading(false);
        }
      };

      auth();
    }
  }, []);

  if (isLoading || state === searchParams.state) {
    return (
      <div className='h-[90vh] flex justify-center items-center'>
        <Loader color='blue' size='xl' type='oval' />
      </div>
    );
  }

  return <div>Invalid Auth State parametr</div>;
}
