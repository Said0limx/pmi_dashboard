'use client';
import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';

import useAreaKeyForTerritory from '@/shared/hooks/use-area-key-for-territory';
import useSort from '@/shared/hooks/use-sort';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { SortIcons } from '@/shared/ui';

export const TableView = ({ data, headers }) => {
  const { main_column_key } = headers;

  const t = useTranslations();
  const areaKey = useAreaKeyForTerritory();
  const { sort, sortKey, sortType, sortedData } = useSort({ data });
  const {
    setAreaField,
    areaFields: { territory_type_id },
  } = useFilterStore();
  return (
    <div className='max-h-[93%] overflow-auto mt-5 mantine-table-container'>
      <Table withRowBorders withColumnBorders stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th align='center' w={50}>
              №
            </Table.Th>
            <Table.Th align='center' w={230}>
              {t('Hududlar')}
            </Table.Th>

            {Object.keys(main_column_key).map((column, index) => (
              <Table.Th
                key={index}
                align='center'
                className='whitespace-nowrap text-center'
                onClick={() => sort(column)}
              >
                <div className='flex items-center gap-2 justify-center cursor-pointer'>
                  {headers.main_column_key[column]}
                  {column === sortKey && <SortIcons sortType={sortType} />}
                </div>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedData.map((item, index) => (
            <Table.Tr key={headers[areaKey][index].id} className='cursor-pointer'>
              <Table.Td align='center'>{index + 1}</Table.Td>
              <Table.Td
                onClick={() => {
                  const { id, region_id } = headers[areaKey][index];
                  if (territory_type_id === 1) {
                    setAreaField('region_id', id);
                  }
                  if (territory_type_id === 2) {
                    if (region_id) {
                      setAreaField('region_id', region_id);
                    }
                    setAreaField('district_id', id);
                  }
                }}
              >
                {headers[areaKey][index][areaKey]}
              </Table.Td>
              {Object.values(item).map((value, childIndex) => (
                <Table.Td key={childIndex} align={'center'}>
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
