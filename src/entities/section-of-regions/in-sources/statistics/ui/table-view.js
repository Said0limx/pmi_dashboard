'use client';

import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';

import useSort from '@/shared/hooks/use-sort';
import { SortIcons } from '@/shared/ui';

export const TableView = ({ headers = {}, data = [] }) => {
  const t = useTranslations();
  const { sortedData, sort, sortKey, sortType } = useSort({ data });
  return (
    <div className='max-h-[93%] overflow-auto mantine-table-container'>
      <Table stickyHeader withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={50} className='whitespace-nowrap' align='center' rowSpan={2}>
              №
            </Table.Th>
            <Table.Th className='whitespace-nowrap min-w-[350px]' align='center' rowSpan={2}>
              {t('Manba')}
            </Table.Th>
            {Object.keys(headers?.main_column_key || {})?.map((column) => (
              <Table.Th
                className='whitespace-nowrap'
                align='center'
                key={column}
                rowSpan={2}
                onClick={() => sort(column)}
              >
                <div className='flex items-center gap-2 cursor-pointer w-full justify-center'>
                  {headers.main_column_key[column]}
                  {column === sortKey && <SortIcons sortType={sortType} />}
                </div>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {headers.source?.map((row, index) => {
            const data = sortedData[index];
            return (
              <Table.Tr key={`${row[`source_id`]}`}>
                <Table.Td className='whitespace-nowrap' align='center'>
                  {index + 1}
                </Table.Td>
                <Table.Td>{row.title}</Table.Td>
                {Object.keys(data)?.map((column, index) => {
                  return (
                    <Table.Td
                      className='whitespace-nowrap'
                      align='center'
                      key={`${row.title}-${column}-${index}`}
                    >
                      {data[column]}
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );
};
