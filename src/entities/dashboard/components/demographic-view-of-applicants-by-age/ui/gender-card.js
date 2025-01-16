import CountUp from 'react-countup';

import { Man, Woman } from '@/assets/icons';

export const GenderCard = ({ title, percent, total_amount, genderType = 'm' }) => {
  const isMan = genderType === 'm';
  return (
    <div className={`p-[10px] w-full ${isMan ? 'bg-[#165BAA]' : 'bg-[#C3A5EA]'} rounded-2xl `}>
      <p className='text-white text-xs mb-4 dark:text-white font-bold'>{title}</p>

      <div className='flex gap-1 items-center relative'>
        <span className='absolute text-white text-[10px] -top-3 right-0 font-bold'>{percent}%</span>
        {isMan ? <Man /> : <Woman />}
        <p className='text-white text-[26px] font-bold leading-8 -tracking-[0.52px]'>
          <CountUp end={total_amount} duration={2} separator=' ' />
        </p>
      </div>
    </div>
  );
};
