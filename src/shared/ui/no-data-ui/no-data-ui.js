'use client';
import { useTranslations } from 'next-intl';

const NoDataUi = () => {
  const t = useTranslations();
  return (
    <div className='text-center h-full flex justify-center items-center'>
      {t("Ma'lumot mavjud emas")}
    </div>
  );
};

export default NoDataUi;
