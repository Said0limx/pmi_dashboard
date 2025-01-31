import { useTranslations } from 'next-intl';

import { TextInput } from '@/shared/ui/text-input';

const FormFields = ({ getInputProps, formKey }) => {
  const t = useTranslations();

  return (
    <div className='grid grid-cols-3 gap-5'>
      <TextInput
        formKey={formKey}
        name={'title_uz'}
        label={t('Title UZ')}
        getInputProps={getInputProps}
        placeholder={t('Title UZ')}
      />
      <TextInput
        formKey={formKey}
        name={'title_ru'}
        label={t('Title RU')}
        getInputProps={getInputProps}
        placeholder={t('Title RU')}
      />
      <TextInput
        formKey={formKey}
        name={'title_oz'}
        label={t('Title OZ')}
        getInputProps={getInputProps}
        placeholder={t('Title OZ')}
      />
      <TextInput
        formKey={formKey}
        name={'title_en'}
        label={t('Title en')}
        getInputProps={getInputProps}
        placeholder={t('Title EN')}
      />
      <TextInput
        formKey={formKey}
        name={'color'}
        label={t('Hex code')}
        getInputProps={getInputProps}
        placeholder={t('Hex code')}
      />
    </div>
  );
};

export default FormFields;
