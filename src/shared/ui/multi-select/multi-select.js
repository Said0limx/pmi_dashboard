import { MultiSelect as MantineMultiSelect } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const MultiSelect = ({
  data = [],
  name,
  placeholder,
  label,
  onChange,
  value,
  size = 'sm',
  radius = 10,
  clearable = true,
  searchable = true,
}) => {
  const t = useTranslations();
  return (
    <MantineMultiSelect
      label={t(label)}
      placeholder={t(placeholder)}
      labelProps={{ className: 'dark:text-white' }}
      classNames={{
        input: 'dark:text-white dark:bg-main_dark_blue',
        wrapper: 'dark:text-white',
        option: 'dark:text-white dark:hover:bg-main_dark_blue',
        dropdown: 'dark:bg-main_deep_blue',
        options: 'dark:bg-main_deep_blue',
      }}
      name={name}
      data={data}
      searchable={searchable}
      clearable={clearable}
      size={size}
      value={value}
      radius={radius}
      onChange={(value) => {
        onChange?.(value);
      }}
    />
  );
};
