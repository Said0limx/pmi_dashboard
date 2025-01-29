import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

import { Moon, Sun } from '@/assets/icons';

export const DarkModeSwitcher = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return (
    <button
      className={`flex justify-center items-center p-[0.563rem] rounded-md bg-color flex-shrink active:scale-95`}
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      aria-label='dark-mode-switcher'
    >
      <span className={`dark-mode-sun`}>
        <Sun />
      </span>
      <span className={`dark-mode-moon`}>
        <Moon />
      </span>
    </button>
  );
};
