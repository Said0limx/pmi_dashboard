import { useClassificationsList } from '@/entities/dashboard/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Loader } from '@/shared/ui';

import { BackButton } from './components/back-button';
import { ClassificationCard } from './components/classification-card';
import { calculatePercent } from './lib/calculate-percent';
import { getHeaderKey } from './lib/get-header-key';
import { getItemKeyString } from './lib/get-item-key';

export const Classifications = () => {
  const { classificationFields } = useFilterStore();
  const { isFetching: isAppealsFetching, data: appealsData = {} } = useClassificationsList({
    extraBody: {
      category_id: classificationFields.category_id,
      problem_id: classificationFields.problem_id,
    },
  });

  return (
    <div className='flex flex-1 flex-col gap-5 relative'>
      <BackButton />

      {isAppealsFetching && (
        <div className={'flex items-center justify-center w-full max-h-[676px] h-[676px]'}>
          <Loader />
        </div>
      )}
      {!isAppealsFetching && (
        <div className={'grid grid-cols-2 gap-5 max-h-[676px] overflow-y-auto pb-6'}>
          {getHeaderKey(appealsData.headers).map((item, index) => {
            return (
              <ClassificationCard
                key={item.id}
                index={index}
                cardId={item.id}
                paramKey={getItemKeyString(classificationFields)}
                title={item.title}
                amount={appealsData?.data?.[index].amount}
                percent={calculatePercent(appealsData.data, index)}
                icon={item.icon_file}
              />
            );
          })}
        </div>
      )}
      {/* <BottomShadow /> */}
    </div>
  );
};
