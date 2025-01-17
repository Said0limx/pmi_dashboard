import CountUp from 'react-countup';

import { makeImageUrl } from '@/shared/utils/make-image-url';

const SourceItem = ({ title, amount, iconUrl }) => {
  return (
    <div className='p-[10px] bg-white dark:bg-main-blue rounded-xl flex flex-col justify-between border'>
      <p className='text-main_light_slate_blue text-xs mb-4 dark:text-white font-bold'>{title}</p>
      <div className='flex gap-2 items-center relative'>
        <div
          className='source-icon'
          style={{
            maskImage: `url(${makeImageUrl(iconUrl)})`,
            WebkitMaskImage: `url(${makeImageUrl(iconUrl)})`,
          }}
        />
        <p className='text-color text-[26px] font-bold leading-8 -tracking-[0.52px]'>
          <CountUp end={amount} duration={2} separator=' ' />
        </p>
        {/* <PercentBadge className='absolute -top-3 right-0' percent={percent} /> */}
      </div>
    </div>
  );
};

export default SourceItem;
