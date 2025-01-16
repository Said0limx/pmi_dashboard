export const setUrl = (url = '') => {
  return url?.includes('http://localhost:12002')
    ? url.replace('http://localhost:12002', process.env.NEXT_PUBLIC_API_URL)
    : `${process.env.NEXT_PUBLIC_API_URL}/storage/${url}`;
};
