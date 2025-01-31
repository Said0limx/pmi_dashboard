import { Divider, Progress, Tooltip } from '@mantine/core';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { useFormatNum } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { makeImageUrl } from '@/shared/utils/make-image-url';

export default function BranchCard({ item }) {
  const t = useTranslations();
  const { setField, sphere_id } = useFilterStore();
  const { formatNum } = useFormatNum();

  // Fact percentage
  const currentFactAmount = parseFloat(item.fact_amount_current) || 0;
  const previousFactAmount = parseFloat(item.fact_amount_previous) || 0;

  const maxFactAmount = Math.max(currentFactAmount, previousFactAmount);
  const minFactAmount = Math.min(currentFactAmount, previousFactAmount);

  const factPercentage = maxFactAmount !== 0 ? (minFactAmount / maxFactAmount) * 100 : 0;

  // Plan percentage
  const currentPlanAmount = parseFloat(item.plan_amount_current) || 0;
  const previousPlanAmount = parseFloat(item.plan_amount_previous) || 0;

  const maxPlanAmount = Math.max(currentPlanAmount, previousPlanAmount);
  const minPlanAmount = Math.min(currentPlanAmount, previousPlanAmount);

  const planPercentage = maxPlanAmount !== 0 ? (minPlanAmount / maxPlanAmount) * 100 : 0;

  const handleClick = () => {
    if (sphere_id) {
      setField('industry_id', item.id);
    } else {
      setField('sphere_id', item.id);
    }
  };

  return (
    <div className='bg-[#404d9a] rounded-[20px] p-[20px] cursor-pointer' onClick={handleClick}>
      <div className='flex items-center gap-3'>
        <div className='w-[40px] h-[40px] bg-[#6271C5] flex items-center justify-center p-[6px] rounded-[8px]'>
          {item.icon_file && (
            <Image width={24} height={24} src={makeImageUrl(item.icon_file)} alt={item.title} />
          )}
        </div>
        <div className="text-white text-lg font-bold font-['DM Sans']">{item.title}</div>
      </div>
      <Divider my='md' color='#6271c4' />
      <div className='flex gap-3'>
        <div className='flex gap-2'>
          <div className='w-2 h-2 mt-1 bg-[#41bbfa] rounded-full' />
          <div className='flex-col justify-start items-start gap-0.5 inline-flex'>
            <div className='justify-start items-start gap-1.5 inline-flex'>
              <div className="text-[#dde3f6] text-xs font-medium font-['DM Sans'] leading-tight">
                {t('Reja')}
              </div>
            </div>
            <div className="text-white text-lg font-bold font-['DM Sans']">
              {formatNum(item.plan_amount)}
            </div>
          </div>
        </div>

        <div className='flex gap-2'>
          <div className='w-2 h-2 mt-1 bg-[#9747ff] rounded-full' />
          <div className='flex-col justify-start items-start gap-0.5 inline-flex'>
            <div className='justify-start items-start gap-1.5 inline-flex'>
              <div className="text-[#dde3f6] text-xs font-medium font-['DM Sans'] leading-tight">
                {t('Fakt')}
              </div>
              <div className='justify-start items-center gap-1 flex'>
                <div className='w-4 h-4 relative overflow-hidden' />
                <div
                  style={{
                    color:
                      item.fact_percentage && Number(item.fact_percentage) > 0
                        ? '#05cd99'
                        : '#ff0000',
                  }}
                  className="text-center  text-xs font-bold font-['DM Sans'] leading-tight"
                >
                  {`${item.fact_percentage} %`}
                </div>
              </div>
            </div>
            <div className="text-white text-lg font-bold font-['DM Sans']">
              {formatNum(item.fact_amount)}
            </div>
          </div>
        </div>
      </div>
      <Tooltip label={`${t('Reja')} - ${item.period_plan_amount_percentage}%`} color='#41bbfa'>
        <Progress
          value={item.period_plan_amount_percentage}
          className='rounded h-[22px]'
          color='#41bbfa'
          mt='md'
        />
      </Tooltip>
      <Tooltip label={`${t('Fakt')} - ${item.period_fact_amount_percentage}%`} color='#9747ff'>
        <Progress
          value={item.period_fact_amount_percentage}
          className='rounded h-[22px]'
          color='#9747ff'
          mt='sm'
        />
      </Tooltip>
    </div>
  );
}
