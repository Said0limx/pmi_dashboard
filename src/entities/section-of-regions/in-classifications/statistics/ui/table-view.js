import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useClassificationKey } from '@/shared/hooks';
import useSort from '@/shared/hooks/use-sort';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { SortIcons } from '@/shared/ui';

const TableView = ({ data, headers }) => {
  const { sortKey, sortType, sort, sortedData } = useSort({ data });

  const { classifierKey } = useClassificationKey();
  const t = useTranslations();
  const {
    setClassificationField,
    classificationFields: { classifier_type_id },
  } = useFilterStore();
  return (
    <div className='max-h-[90%] overflow-auto mantine-table-container'>
      <Table stickyHeader withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={50} className='whitespace-nowrap' align='center' rowSpan={2}>
              №
            </Table.Th>
            <Table.Th className='whitespace-nowrap min-w-[350px]' align='center' rowSpan={2}>
              {t('Tasniflar')}
            </Table.Th>
            {Object.keys(headers?.main_column_key || {})?.map((column) => (
              <Table.Th
                className='whitespace-nowrap'
                align='center'
                key={column}
                rowSpan={2}
                onClick={() => sort(column)}
              >
                <div className='flex items-center gap-2 cursor-pointer'>
                  {headers.main_column_key[column]}
                  {column === sortKey && <SortIcons sortType={sortType} />}
                </div>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {headers[classifierKey]?.map((row, index) => {
            const item = sortedData[index];

            return (
              <Table.Tr key={row.id}>
                <Table.Td className='whitespace-nowrap' align='center'>
                  {index + 1}
                </Table.Td>
                <Table.Td
                  className='cursor-pointer'
                  onClick={() => {
                    if (classifier_type_id === 1) {
                      setClassificationField('category_id', row.id);
                    }
                    if (classifier_type_id === 2) {
                      if (row.category_id) {
                        setClassificationField('category_id', row.category_id);
                      }
                      setClassificationField('problem_id', row.id);
                    }
                  }}
                >
                  {row.title}
                </Table.Td>
                {Object.keys(item)?.map((column, index) => {
                  return (
                    <Table.Td
                      className='whitespace-nowrap'
                      align='center'
                      key={`${row.title}-${column}-${index}`}
                    >
                      {item[column]}
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

export default TableView;
