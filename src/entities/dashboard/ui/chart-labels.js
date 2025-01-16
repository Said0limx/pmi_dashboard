import { ChartLabelItem } from './chart-label-item';

const ChartLabels = ({ data = [], withPercent, withNumber, chartLabelItemClass }) => {
  return (
    <div className='bg-white dark:bg-[#32419B] px-4 rounded-2xl max-h-[260px] overflow-y-auto flex-1 h-max relative shadow-[0px_10px_10px_0px_#7090B01F] divide-y'>
      {data.map((item, index) => (
        <ChartLabelItem
          key={index}
          badgeColor={item.color}
          number={item.amount}
          label={item.title}
          percent={item.percentage}
          withNumber={withNumber}
          withPercent={false}
          chartLabelItemClass={chartLabelItemClass}
        />
      ))}
    </div>
  );
};

export default ChartLabels;
