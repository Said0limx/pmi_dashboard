import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { useClassificationKey, useSetClassificationId } from '@/shared/hooks';
import useSort from '@/shared/hooks/use-sort';
import { SortIcons } from '@/shared/ui';

const ClassificationStatisticsTableView = ({ data = [], headers = {} }) => {
  const { classifierKey } = useClassificationKey();

  const key = classifierKey;

  const mappedData = useMemo(
    () =>
      data.map((el, index) => {
        return {
          ...headers[key][index],
          ...el,
        };
      }),
    [data, headers, key],
  );

  const handleClick = useSetClassificationId();

  const t = useTranslations();
  const { sort, sortKey, sortType, sortedData } = useSort({ data: mappedData });

  return (
    <div className='h-[93%] flex flex-col justify-between'>
      <div className='h-full overflow-auto'>
        <Table withColumnBorders stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th align='center'>{t('№')}</Table.Th>
              <Table.Th align='center' className='min-w-[350px]'>
                {t('Tasniflar')}
              </Table.Th>
              {Object.keys(headers?.main_column_key || {}).map((column) => (
                <Table.Th
                  className='whitespace-nowrap cursor-pointer'
                  align='center'
                  key={column}
                  onClick={() => sort(column)}
                >
                  <div className='flex items-center justify-center gap-2'>
                    {headers.main_column_key[column]}
                    {column === sortKey && <SortIcons sortType={sortType} />}
                  </div>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData?.map((row, index) => (
              <Table.Tr key={index} className='border-b'>
                <Table.Td align='center'>{index + 1}</Table.Td>
                <Table.Td
                  className='cursor-pointer'
                  onClick={() => {
                    handleClick({ id: row.id, parent_id: row.category_id });
                  }}
                >
                  {row[key]}
                </Table.Td>
                {Object.keys(headers.main_column_key || {}).map((column) => (
                  <Table.Td align='center' key={column}>
                    {row[column]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default ClassificationStatisticsTableView;
