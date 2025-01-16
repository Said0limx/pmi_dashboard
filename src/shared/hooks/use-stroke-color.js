import { useComputedColorScheme } from '@mantine/core';

export const useStrokeColor = () => {
  const colorScheme = useComputedColorScheme();
  const color = colorScheme === 'dark' ? '#ffffff' : '#000000';
  return color;
};
