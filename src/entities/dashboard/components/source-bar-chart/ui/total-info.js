import { useTranslations } from 'next-intl';

function TotalInfo() {
  const t = useTranslations();

  return (
    <div className={'flex gap-2'}>
      <div
        className={
          'w-full bg-white dark:bg-main-blue h-full rounded-lg p-2 flex flex-col items-center justify-center'
        }
      >
        <div className={'text-color text-md font-semibold'}>
          {t('2025 yilda Ishga tushiriladigan 100 ta, $152 mln Shundan periodda - 25 ta, $35 mln')}
        </div>
      </div>
      <div
        className={
          'w-full bg-white dark:bg-main-blue h-full rounded-lg p-2 flex flex-col items-center justify-center'
        }
      >
        <div className={'text-color text-md font-semibold'}>
          {t('2025 yilda yaratiladigan ish o‘rni soni 2500 ta Shundan periodda - 570 ta')}
        </div>
      </div>
    </div>
  );
}

export default TotalInfo;
