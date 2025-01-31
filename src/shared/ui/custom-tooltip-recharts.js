import { colors } from '@/shared/variables/colors';

import { useFormatNum } from '../hooks';

export const CustomTooltipRecharts = ({
  label,
  payload,
  titlesObject,
  isLabelInPayload,
  colorList,
  isFormatted = false,
}) => {
  const { formatNum } = useFormatNum();
  return (
    <div className='bg-white dark:bg-main_dark_blue p-2 rounded-lg max-w-[500px]'>
      <div className='text-color text-lg leading-6'>
        {isLabelInPayload ? payload[0]?.payload?.title : label}
      </div>
      <div>
        {payload.map((item, index) => (
          <div key={index} className='flex justify-between gap-3 items-center'>
            <div className='flex gap-2 items-center'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: colorList ? colorList[index] : colors[index] }}
              ></div>
              <div className='text-color'>{titlesObject[item.name]}</div>
            </div>
            <div className='text-color'>{isFormatted ? formatNum(item.value) : item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
