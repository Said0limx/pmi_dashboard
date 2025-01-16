import { useTranslations } from 'next-intl';

const NoData = ({ isLoading, dataLength }) => {
  const t = useTranslations();
  return (
    !isLoading &&
    !dataLength && (
      <div className='text-center h-full flex justify-center items-center'>
        {t("Ma'lumot mavjud emas")}
      </div>
    )
  );
};

export default NoData;
