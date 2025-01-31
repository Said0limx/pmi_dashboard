import { Tooltip } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useFormatNum, useFormatSum } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { colors } from '@/shared/variables/colors';

const UzbekistanMap = ({ data }) => {
  const { areaFields, setAreaField } = useFilterStore();
  const { formatNum } = useFormatNum();
  const t = useTranslations();

  const regions = {
    1726: '0 0 303 325',
    1710: '0 0 789 463',
    1727: '0 0 560 602',
    1722: '0 0 473 593',
    1718: '0 0 722 569',
    1730: '0 0 788 495',
    1714: '0 0 472 326',
    1703: '0 0 824 438',
    1708: '0 0 605 578',
    1706: '0 0 579 597',
    1733: '0 0 712 571',
    1735: '0 0 640 606',
    1712: '0 0 504 582',
    1724: '0 0 594 565',
  };

  return (
    <svg
      width='100%'
      height='350'
      viewBox={areaFields.region_id ? regions[areaFields.region_id] : '0 0 740 484'}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {data?.map((region) => {
        return (
          <Tooltip
            withArrow
            color='#1a759f'
            label={
              <div className='flex flex-col gap-1'>
                <p className='font-bold'>{region.title}</p>
                <div className='flex items-center gap-2'>
                  <span>{t('Reja')}:</span>
                  <span>{formatNum(region.plan_amount)}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span>{t('Fakt')}:</span>
                  <span>{formatNum(region.fact_amount)}</span>
                </div>
              </div>
            }
            key={region.id}
          >
            <path
              onClick={() => {
                if (!areaFields.region_id) {
                  setAreaField('region_id', region.id);
                }
              }}
              className='cursor-pointer hover:fill-[#1a759f]'
              d={region.coordination}
              fill={region.color ?? colors[0]}
              stroke='white'
              strokeMiterlimit='10'
            />
          </Tooltip>
        );
      })}
    </svg>
  );
};

export default UzbekistanMap;
