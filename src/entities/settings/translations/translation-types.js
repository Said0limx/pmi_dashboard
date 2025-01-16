import { useTranslations } from 'next-intl';

import { ContentBox } from '@/shared/ui';

const TranslationTypes = ({ setTranslationType, translationType }) => {
  const t = useTranslations();
  return (
    <div className='mb-5'>
      <ContentBox>
        <div className='border grid grid-cols-6 rounded border-slate-200 dark:border-main_blue_3 p-1 gap-1 text-sm'>
          {[
            t('Tarjimalar'),
            t('Katalog tarjimalari'),
            t('Tasniflar tarjimalari'),
            t('Viloyatlar/Tumanlar tarjimalari'),
            t('Mahallalar tarjimalari'),
            t('Tashkilotlar tarjimalari'),
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-center gap-1 dark:hover:bg-main_blue_1 p-1 rounded text-color cursor-pointer tracking-tighter ${translationType === index && 'dark:bg-main_blue_1 bg-slate-200'}`}
              onClick={() => {
                setTranslationType(index);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </ContentBox>
    </div>
  );
};

export default TranslationTypes;
