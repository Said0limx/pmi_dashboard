import { CaretDownFilled, CaretUpFilled } from '@/assets/icons';
import { classNames } from '@/shared/utils';

export const PercentBadge = ({ percent = '', className = '', withBg = false }) => {
  const percentUp = percent.includes('+');
  const cs = classNames(
    className,
    `flex items-center gap-1 ${withBg && `px-3 py-[2px] rounded-xl ${percentUp ? 'bg-[#05CD991A]' : 'bg-[#E93A3A1A]'}`}`,
  );
  return (
    <div className={cs}>
      {percentUp ? <CaretUpFilled /> : <CaretDownFilled />}
      <span
        className={`text-base leading-5 font-bold ${percentUp ? 'text-main_medium_aquamarine' : 'text-main_fire_engine_red'}`}
      >
        {percent}%
      </span>
    </div>
  );
};
