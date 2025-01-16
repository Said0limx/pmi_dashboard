import { TextInput as MantineTextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const TextInput = ({
  getInputProps,
  name,
  placeholder,
  label,
  size = 'sm',
  radius = 12,
  className = '',
  type = 'text',
  formKey,
}) => {
  const t = useTranslations();
  return (
    <MantineTextInput
      type={type}
      key={formKey(name)}
      label={t(label)}
      placeholder={t(placeholder)}
      className={`${className}`}
      labelProps={{ className: 'dark:text-white' }}
      name={name}
      size={size}
      radius={radius}
      classNames={{
        input: 'dark:text-white dark:bg-main_dark_blue',
        wrapper: 'dark:text-white',
        option: 'dark:text-white dark:hover:bg-main_dark_blue',
        dropdown: 'dark:bg-main_deep_blue',
        options: 'dark:bg-main_deep_blue',
      }}
      {...getInputProps?.(name)}
    />
  );
};
