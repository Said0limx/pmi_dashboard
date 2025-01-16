'use client';
import { Button, Divider, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import cookies from 'js-cookie';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { Link, useRouter } from '@/i18n/routing';
import { useMutation } from '@/shared/hooks';

const styles = {
  root: { marginBottom: 20 },
  input: {
    paddingTop: '0.813rem',
    paddingBottom: '0.813rem',
    paddingLeft: '3.3rem',
    paddingRight: '1rem',
    fontSize: 16,
    height: 50,
    borderRadius: '12px',
    color: '#2B3674',
    backgroundColor: '#F3F4F6',
  },
  section: { marginLeft: '1rem' },
};

export default function Login() {
  const router = useRouter();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (value ? null : 'Username is required'),
      password: (value) => (value ? null : 'Password is required'),
    },
  });

  const { mutate, isPending } = useMutation();
  const onSuccess = (response) => {
    cookies.set('access-token', response.data.access_token);
    toast.success('Login successful please wait a moment...');
    router.push('/');
  };

  const onError = (error) => {
    toast.error(error.response?.data.message || error?.message || 'Something went wrong');
  };
  return (
    <div className='grid  lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-5 min-h-[100vh] bg-white dark:bg-inherit'>
      <div className='lg:hidden overflow-y-auto max-sm:mx-5  col-span-1 flex justify-center items-end relative'>
        {/* <div className={`w-full h-full bg-[url('/assets/images/login-banner.svg')] bg-no-repeat`} /> */}
        <Image
          src='/assets/images/login-mobile-banner.svg'
          width={770}
          height={964}
          className='w-[31.25rem] max-h-60'
          alt='Lock icon'
        />
      </div>
      <div className='col-span-1 max-sm:mx-5 lg:my-auto'>
        <h1 className='text-center text-[2.125rem] text-[#171725] dark:text-white font-semibold mb-4'>
          Login
        </h1>
        <h3 className='text-center text-[#98A2B0]'>Enter your credentials to login</h3>
        <form
          onSubmit={form.onSubmit((values) =>
            mutate({ url: 'auth/login-by-user', data: values }, { onSuccess, onError }),
          )}
          className='sm:w-[31.25rem] m-auto'
        >
          <TextInput
            label='Username'
            labelProps={{ className: 'dark:text-white text-[#171725] mb-2' }}
            key={form.key('username')}
            styles={styles}
            className='!text-main_deep_blue'
            leftSection={
              <Image src='/assets/icons/profile.svg' width={24} height={24} alt='Lock icon' />
            }
            {...form.getInputProps('username')}
          />

          <TextInput
            label='Password'
            type='password'
            labelProps={{ className: 'dark:text-white text-[#171725] mb-2' }}
            styles={styles}
            key={form.key('password')}
            leftSection={
              <Image src='/assets/icons/lock.svg' width={24} height={24} alt='Lock icon' />
            }
            {...form.getInputProps('password')}
          />

          <Button
            fullWidth
            type='submit'
            loading={isPending}
            className='!h-[3.125rem] !rounded-[0.625rem] !bg-[#0183C6] !text-base'
          >
            Login
          </Button>
          <Divider
            label='or'
            labelPosition='center'
            className='!my-5'
            styles={{ label: { fontSize: 14, fontWeight: 600 } }}
          />
          <Link href='/login-via-one-id'>
            <Button
              fullWidth
              className='!h-[3.125rem] !rounded-[0.625rem] !bg-[#E5F0FF] !text-base !text-[#0183C6]'
            >
              Access via one ID
            </Button>
          </Link>
        </form>
      </div>
      <div className='hidden   col-span-1 lg:flex justify-center items-center relative m-[1.875rem]'>
        {/* <div className={`w-full h-full bg-[url('/assets/images/login-banner.svg')] bg-no-repeat`} /> */}
        <Image src='/assets/images/login-banner.svg' alt='Lock icon' fill />
      </div>
    </div>
  );
}
