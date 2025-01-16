import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useClassificationKey } from '@/shared/hooks';
import useSort from '@/shared/hooks/use-sort';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { SortIcons } from '@/shared/ui';

const TableView = ({ data, headers }) => {
  const { classifierKey } = useClassificationKey();
  const t = useTranslations();
  const { sortedData, sort, sortKey, sortType } = useSort({ data });
  const {
    classificationFields: { classifier_type_id },
    setClassificationField,
  } = useFilterStore();

  return (
    <div className='max-h-[93%] overflow-auto mantine-table-container'>
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
                <div className='flex items-center gap-2 justify-center cursor-pointer'>
                  {headers.main_column_key[column]}
                  {column === sortKey && <SortIcons sortType={sortType} />}
                </div>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedData?.map(({ id, title, ...rest }, index) => {
            return (
              <Table.Tr key={id}>
                <Table.Td className='whitespace-nowrap' align='center'>
                  {index + 1}
                </Table.Td>
                <Table.Td
                  className='cursor-pointer'
                  onClick={() => {
                    const { id, category_id } = headers[classifierKey][index];
                    if (classifier_type_id === 1) {
                      setClassificationField('category_id', id);
                    } else if (classifier_type_id === 2) {
                      if (category_id) {
                        setClassificationField('category_id', category_id);
                      }
                      setClassificationField('problem_id', id);
                    }
                  }}
                >
                  {title}
                </Table.Td>
                {Object.keys(rest)?.map((column, index) => {
                  return (
                    <Table.Td
                      className='whitespace-nowrap'
                      align='center'
                      key={`${title}-${column}-${index}`}
                    >
                      {rest[column]}
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
