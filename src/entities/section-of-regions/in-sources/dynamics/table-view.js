import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';

import useSort from '@/shared/hooks/use-sort';
import { SortIcons } from '@/shared/ui';

const TableView = ({ data, headers }) => {
  const main_column_key = Object.keys(headers.main_column_key);
  const subColumns = Object.keys(headers.sub_column_key);
  const { title, id, has_child, ...rest } = data[0] || {};
  const subColumnKeys = Object.keys(rest);
  const t = useTranslations();
  const { sort, sortKey, sortType, sortedData } = useSort({ data });
  return (
    <div className='overflow-auto mantine-table-container'>
      <Table withRowBorders withColumnBorders stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th rowSpan={2} w={50} className='text-center'>
              №
            </Table.Th>
            <Table.Th rowSpan={2} align='center'>
              {t('Manbalar')}
            </Table.Th>
            {main_column_key?.map((column, index) => (
              <Table.Th className='text-center' colSpan={index === 0 ? 4 : 3} key={column}>
                {headers.main_column_key[column]}
              </Table.Th>
            ))}
          </Table.Tr>
          <Table.Tr>
            {subColumns.map((subColumn, index) => (
              <Table.Th
                align='center'
                className='whitespace-nowrap text-center'
                key={subColumn}
                onClick={() => {
                  sort(subColumnKeys[index]);
                }}
              >
                <div className='flex items-center gap-2 cursor-pointer'>
                  {headers.sub_column_key[subColumn]}
                  {subColumnKeys[index] === sortKey && <SortIcons sortType={sortType} />}
                </div>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedData?.map(({ title, id, ...rest }, index) => {
            return (
              <Table.Tr key={id}>
                <Table.Td align='center'>{index + 1}</Table.Td>
                <Table.Td className='whitespace-nowrap cursor-pointer'>{title}</Table.Td>
                {Object.keys(rest).map((key, index) => (
                  <Table.Td align='center' key={index} className='whitespace-nowrap'>
                    {rest[key]}
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

export default TableView;
