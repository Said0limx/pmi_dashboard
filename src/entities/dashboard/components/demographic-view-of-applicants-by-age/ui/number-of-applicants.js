import { useTranslations } from 'next-intl';
import CountUp from 'react-countup';

export const NumberOfApplicants = ({ appealsCount }) => {
  const t = useTranslations();
  return (
    <div className='bg-white py-[10px] px-4 rounded-2xl w-full'>
      <p className='text-center text-main_slate  text-sm font-bold'>{t('Murojaatchilar soni')}</p>
      <p className='text-main_deep_blue text-center text-[26px] font-bold leading-8 -tracking-[0.52px] mt-3'>
        <CountUp end={appealsCount} duration={2} separator=' ' />
      </p>
    </div>
  );
};
