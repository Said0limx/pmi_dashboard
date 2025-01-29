import { useTranslations } from 'next-intl';
import CountUp from 'react-countup';

import { useFilterStore } from '@/shared/store/use-filter-store';
import { makeImageUrl } from '@/shared/utils/make-image-url';

const SourceItem = ({ title, amount, iconUrl, id }) => {
  const { setField, sphere_id } = useFilterStore();
  const t = useTranslations();
  const handleClick = () => {
    if (sphere_id) {
      setField('industry_id', id);
    } else {
      setField('sphere_id', id);
    }
  };

  const end = amount > 1000 ? (amount / 1000)?.toFixed(2) : Number(amount).toFixed(2);

  return (
    <div
      onClick={handleClick}
      className='p-[10px] bg-white dark:bg-[#32419B] rounded-xl flex flex-col justify-between border cursor-pointer'
    >
      <p className='text-main_light_slate_blue text-lg mb-4 dark:text-white font-bold'>{title}</p>
      <div className='flex gap-2 items-center relative'>
        <div
          className='source-icon'
          style={{
            maskImage: `url(${makeImageUrl(iconUrl)})`,
            WebkitMaskImage: `url(${makeImageUrl(iconUrl)})`,
          }}
        />
        <p className='text-color text-[26px] font-bold leading-8 -tracking-[0.52px]'>
          <CountUp
            end={end}
            duration={2}
            decimals={2}
            prefix='$'
            suffix={amount > 1000 ? ` ${t('mlrd')}` : ` ${t('mln')}`}
          />
        </p>
        {/* <PercentBadge className='absolute -top-3 right-0' percent={percent} /> */}
      </div>
    </div>
  );
};

export default SourceItem;
