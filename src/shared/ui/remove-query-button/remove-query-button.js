'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ArrowLeft } from '@/assets/icons';

export const RemoveQueryButton = ({ onClick = () => {}, queryKey = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleRemove = () => {
    const params = new URLSearchParams();
    searchParams.keys().forEach((key) => {
      if (key !== queryKey) params.append(key, searchParams.get(key));
    });
    router.push(pathname + '?' + params.toString());
  };
  return (
    <button
      onClick={() => {
        handleRemove();
        onClick();
      }}
      className='flex items-center px-2 py-1 rounded-md bg-slate-400 text-white hover:bg-slate-500'
    >
      <ArrowLeft /> Ortga
    </button>
  );
};
