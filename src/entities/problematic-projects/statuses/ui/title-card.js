'use client';
import { useTranslations } from 'next-intl';
import CountUp from 'react-countup';

import { makeImageUrl } from '@/shared/utils/make-image-url';

const TitleCard = ({ title, url = '', end = 0, handleClick = () => {} }) => {
  const t = useTranslations();

  return (
    <div
      onClick={handleClick}
      className='p-[20px] bg-white dark:bg-transparent  dark:bg-blue-gradient rounded-xl flex flex-col justify-between border cursor-pointer'
    >
      <p className='text-xl text-color font-bold text-nowrap'>{title}</p>
      <div className='flex border my-3  dark:border-[#6271c4] ' />

      <div className='flex justify-between gap-2 items-end relative'>
        <div className='border dark:border-0 dark:bg-[#6271C5] flex items-center justify-center p-[8px] rounded-[8px]'>
          <div
            className='source-icon !w-[45px] !h-[45px]'
            style={{
              maskImage: `url(${makeImageUrl(url)})`,
              WebkitMaskImage: `url(${makeImageUrl(url)})`,
            }}
          />
        </div>
        <p className='text-color text-[26px] font-bold leading-8 -tracking-[0.52px]'>
          <CountUp end={end} duration={2} decimals={0} prefix='' suffix={` ${t('ta')}`} />
        </p>
      </div>
    </div>
  );
};

export default TitleCard;
