import { motion } from 'framer-motion';
import Image from 'next/image';

import { useFilterStore } from '@/shared/store/use-filter-store';
import { PercentBadge } from '@/shared/ui';
import { formatNumber, setUrl } from '@/shared/utils';

export const ClassificationCard = ({ title, amount, icon, percent, cardId, paramKey, index }) => {
  const { setClassificationField } = useFilterStore();

  const handleClick = () => {
    if (paramKey !== 'classification' && paramKey) {
      setClassificationField(paramKey, cardId);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className='bg-white dark:bg-transparent dark:bg-blue-gradient flex flex-col justify-between p-3 min-h-[130px] border-[1px] dark:border-[#A2ADE8] rounded-[12px] cursor-pointer'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: index * 0.05 } }}
    >
      <div className='text-main-blue dark:text-white font-[700] text-[18px] leading-[27px] text-ellipsis line-clamp-3 mb-2'>
        {title}
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          {icon && (
            <div>
              <Image
                className='invert dark:invert-0'
                src={setUrl(icon)}
                alt='Image'
                width={30}
                height={30}
              />
            </div>
          )}
          <div className='text-main-blue dark:text-white font-[700] text-[24px]'>
            {formatNumber(amount)}
          </div>
        </div>
        <PercentBadge percent={percent} />
      </div>
    </motion.div>
  );
};
