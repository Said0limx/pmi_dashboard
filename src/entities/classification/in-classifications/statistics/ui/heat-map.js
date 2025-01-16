import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { usePeriodMonthsList } from '@/shared/api-hooks/main-filter';
import { useSetClassificationId } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';

const HeatMap = ({ data, headers, isLoading }) => {
  const { periodFields } = useFilterStore();
  const { data: months = [] } = usePeriodMonthsList();
  const monthObject = months.reduce((acc, el) => ({ ...acc, [el.id]: el.name }), {});
  const { handleClick } = useSetClassificationId();
  const t = useTranslations();
  if (isLoading) {
    return null;
  }

  return (
    <div className='h-[90%] overflow-auto mt-5'>
      <Table withRowBorders withColumnBorders stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t('Tasniflar')}</Table.Th>
            {headers.period?.map((period) => (
              <Table.Th className='text-center' key={period}>
                {periodFields.period_type_id === 1 || periodFields.period_type_id === 5
                  ? period
                  : monthObject[period]}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((item) => {
            return (
              <Table.Tr key={item.id}>
                <Table.Td onClick={() => handleClick(item.id)} className='cursor-pointer'>
                  {item.title}
                </Table.Td>
                {item.values?.map((value, index) => (
                  <Table.Td
                    key={`${item.id}-${index}`}
                    align='center'
                    style={{ background: value.color }}
                  >
                    <span className='text-black'>{value.amount}</span>
                  </Table.Td>
                ))}
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default HeatMap;
