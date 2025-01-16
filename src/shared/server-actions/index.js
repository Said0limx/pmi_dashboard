'use server';
import { redirect } from 'next/navigation';

export const redirectAction = async (url) => {
  redirect(url);
};
