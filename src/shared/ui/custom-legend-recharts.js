import { colors } from '@/shared/variables/colors';

export const CustomLegendRecharts = ({ payload, titlesObject }) => {
  return (
    <ul className='flex justify-center flex-wrap gap-x-4 gap-y-2 mb-4'>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className='flex items-center'>
          <span
            style={{ backgroundColor: colors[index] }}
            className='inline-block w-3 h-3 mr-2 rounded-full'
          ></span>
          <span style={{ color: 'hsl(var(--primary))' }}>{titlesObject[entry.value]}</span>
        </li>
      ))}
    </ul>
  );
};
