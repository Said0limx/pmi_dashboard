'use client';
import { useTranslations } from 'next-intl';

import { useFilterStore } from '@/shared/store/use-filter-store';

import { handleBack } from '../lib/handle-back';

export const BackButton = () => {
  const { classificationFields, setClassificationField } = useFilterStore();
  const t = useTranslations();

  return (
    <div className='flex items-end'>
      <div
        onClick={() => handleBack(classificationFields, setClassificationField)}
        className='cursor-pointer bg-language-switch-gradient border-[#A2ADE8] border rounded-[12px] px-3 py-2'
      >
        <div className='flex items-center justify-center gap-10'>
          <div className='text-[16px] font-bold text-[#A3AED0]'>{t('Orqaga')}</div>
        </div>
      </div>
    </div>
  );
};
