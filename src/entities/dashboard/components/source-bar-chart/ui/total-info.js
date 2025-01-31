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
          2025 йилда Ишга тушириладиган 100 та, $152 млн Шундан периодда - 25 та, $ 55 млн{' '}
        </div>
      </div>
      <div
        className={
          'w-full bg-white dark:bg-main-blue h-full rounded-lg p-2 flex flex-col items-center justify-center'
        }
      >
        <div className={'text-color text-md font-semibold'}>
          2025 йилда яратиладиган иш ўрни сони 3000 та Шундан периодда - 180 та{' '}
        </div>
      </div>
    </div>
  );
}

export default TotalInfo;
