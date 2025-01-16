'use client';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();

  return <div>Edit page {params.id}</div>;
};

export default Page;
