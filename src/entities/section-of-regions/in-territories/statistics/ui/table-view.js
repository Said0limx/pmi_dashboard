'use client';
import { Table } from '@mantine/core';

import { useSetRegionOrDistrictId } from '@/shared/hooks';
import useSort from '@/shared/hooks/use-sort';
import { SortIcons } from '@/shared/ui';

export const TableView = ({ data, headers }) => {
  const { handleSet } = useSetRegionOrDistrictId();
  const { sortKey, sortType, sort, sortedData } = useSort({ data });
  return (
    <div className='max-h-[90%] overflow-auto mt-5 mantine-table-container'>
      <Table withRowBorders withColumnBorders stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th align='center' w={50} className='text-center'>
              №
            </Table.Th>
            {Object.keys(headers).map((column, index) => (
              <Table.Th
                key={index}
                className={`whitespace-nowrap ${index > 0 && 'text-center'}`}
                onClick={() => sort(column)}
              >
                <div
                  className={`flex items-center gap-2 cursor-pointer ${index > 0 && 'justify-center'}`}
                >
                  {headers[column]}
                  {column === sortKey && <SortIcons sortType={sortType} />}
                </div>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedData.map(({ id, ...item }, index) => (
            <Table.Tr key={id} className='cursor-pointer'>
              <Table.Td align='center'>{index + 1}</Table.Td>
              {Object.values(item).map((value, childIndex) => (
                <Table.Td
                  onClick={() => handleSet(id)}
                  key={`${id}-${childIndex}`}
                  className='whitespace-nowrap'
                  align={childIndex === 0 ? 'left' : 'center'}
                >
                  {value}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};
