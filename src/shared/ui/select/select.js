import { Select as MantineSelect } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const Select = ({
  setFieldValue,
  getInputProps,
  data = [],
  name,
  placeholder,
  label,
  onChange,
  size = 'sm',
  radius = 10,
  className = '',
  value = null,
  defaultValue = null,
  clearable = true,
  allowDeselect = false,
  searchable = true,
  disabled = false,
}) => {
  const t = useTranslations();
  return (
    <MantineSelect
      value={value}
      disabled={disabled}
      clearable={clearable}
      defaultValue={defaultValue}
      searchable={searchable}
      label={label}
      placeholder={placeholder}
      className={`${className}`}
      allowDeselect={allowDeselect}
      labelProps={{ className: 'dark:text-white text-sm' }}
      name={name}
      data={data}
      size={size}
      radius={radius}
      nothingFoundMessage={t('Nothing found')}
      classNames={{
        input: 'dark:text-white dark:bg-main_dark_blue text-sm',
        wrapper: 'dark:text-white',
        option: 'dark:text-white dark:hover:bg-main_dark_blue',
        dropdown: 'dark:bg-main_deep_blue',
        options: 'dark:bg-main_deep_blue',
      }}
      {...getInputProps?.(name)}
      onChange={(value) => {
        setFieldValue?.(name, value);
        onChange?.(value);
      }}
    />
  );
};
