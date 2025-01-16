import { InputLabel, Switch } from '@mantine/core';
import { useTranslations } from 'next-intl';

const IsProceduralSwitch = ({ setFieldValue, getInputProps }) => {
  const t = useTranslations();
  return (
    <div>
      <InputLabel htmlFor='is_procedural'>{t('Procedural')}</InputLabel>
      <Switch
        {...getInputProps('is_procedural')}
        checked={!!getInputProps('is_procedural').value}
        label={t('Procedural')}
        id='is_procedural'
        name='is_procedural'
        className='mt-2'
        onChange={(event) => setFieldValue('is_procedural', event.currentTarget.checked)}
      />
    </div>
  );
};

export default IsProceduralSwitch;
