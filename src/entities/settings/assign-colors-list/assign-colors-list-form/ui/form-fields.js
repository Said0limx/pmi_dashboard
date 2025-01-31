'use client';
import { useTranslations } from 'next-intl';

import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const FormFields = ({ getInputProps, formKey, setFieldValue, colorsList, colorFileds }) => {
  const t = useTranslations();

  return (
    <div className='grid grid-cols-2 gap-5'>
      <Select
        label={t('Field')}
        placeholder={t('Field')}
        name='field_id'
        formKey={formKey}
        setFieldValue={setFieldValue}
        getInputProps={getInputProps}
        data={enumsMapper(colorFileds, { labelKey: 'title' })}
      />
      <Select
        label={t('Color')}
        placeholder={t('Color')}
        name='color_id'
        formKey={formKey}
        clearable={false}
        getInputProps={getInputProps}
        setFieldValue={setFieldValue}
        data={enumsMapper(colorsList, { labelKey: 'title' })}
      />
    </div>
  );
};

export default FormFields;
