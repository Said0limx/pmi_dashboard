import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import { usePeriodMonthsList } from '@/shared/api-hooks/main-filter';
import { useAuthStore } from '@/shared/store/use-auth-store';
import { useFilterStore } from '@/shared/store/use-filter-store';

const HeatMap = ({ data, headers, isLoading }) => {
  const { periodFields } = useFilterStore();
  const { data: months = [] } = usePeriodMonthsList();
  const monthObject = months.reduce((acc, el) => ({ ...acc, [el.id]: el.name }), {});
  const { authority_ids } = useFilterStore();
  const { userDetails } = useAuthStore();
  const t = useTranslations();
  if (isLoading) {
    return null;
  }

  return (
    <div className='h-[90%] overflow-auto mt-5'>
      <Table withRowBorders withColumnBorders stickyHeader className='mt-5'>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t('Tashkilotlar')}</Table.Th>
            {headers.period?.map((period) => (
              <Table.Th className='text-center' key={period}>
                {periodFields.period_type_id === 1 || periodFields.period_type_id === 5
                  ? period
                  : monthObject[period]}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        {authority_ids.length || userDetails?.authority_id !== 1 ? (
          <SecondBody data={data} period={headers.period} />
        ) : (
          <FirstBody data={data} />
        )}
      </Table>
    </div>
  );
};

const FirstBody = ({ data }) => {
  const { setAuthorityField } = useFilterStore();

  return (
    <Table.Tbody>
      {data?.map((item) => {
        return (
          <Table.Tr key={item.id}>
            <Table.Td
              onClick={() => {
                if (item.has_child) {
                  setAuthorityField(item.id);
                }
              }}
              className='cursor-pointer'
            >
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
  );
};

const SecondBody = ({ data, period }) => {
  const { setAuthorityField } = useFilterStore();

  return (
    <Table.Tbody>
      {data?.map((item) => {
        return (
          <Fragment key={item.id}>
            <Table.Tr key={item.id} className={'bg-main-blue'}>
              <Table.Td colSpan={period.length + 1 || 1} className='cursor-pointer'>
                {item.title}
              </Table.Td>
            </Table.Tr>
            {item.data?.map((item, index) => (
              <Table.Tr key={item.id}>
                <Table.Td
                  onClick={() => {
                    if (item.has_child) {
                      setAuthorityField(item.id);
                    }
                  }}
                  className='cursor-pointer'
                >
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
            ))}
          </Fragment>
        );
      })}
    </Table.Tbody>
  );
};

export default HeatMap;
