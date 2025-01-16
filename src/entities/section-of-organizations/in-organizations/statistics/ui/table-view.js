import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import useSort from '@/shared/hooks/use-sort';
import { useAuthStore } from '@/shared/store/use-auth-store';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { SortIcons } from '@/shared/ui';

const TableView = ({ data, headers, isLoading }) => {
  const t = useTranslations();
  const { authority_ids } = useFilterStore();
  const { userDetails } = useAuthStore();
  const { sort, sortKey, sortType } = useSort();
  if (isLoading) return null;

  return (
    <div className='max-h-[85%] overflow-auto mantine-table-container'>
      <Table stickyHeader withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={50} className='whitespace-nowrap' align='center' rowSpan={2}>
              №
            </Table.Th>
            <Table.Th className='whitespace-nowrap min-w-[350px]' align='center' rowSpan={2}>
              {t('Tashkilotlar')}
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
        {authority_ids.length || userDetails?.authority_id !== 1 ? (
          <BodyForOrganizationsAndChildren data={data} sortStates={{ sortKey, sortType }} />
        ) : (
          <BodyForOnlyOrganizations data={data} sortStates={{ sortKey, sortType }} />
        )}
      </Table>
    </div>
  );
};

const BodyForOnlyOrganizations = ({ data, sortStates }) => {
  const { setAuthorityField } = useFilterStore();
  const { sortedData } = useSort({ data, sortStates });

  return (
    <Table.Tbody>
      {sortedData?.map(({ id, title, has_child, ...rest }, index) => {
        return (
          <Table.Tr key={id}>
            <Table.Td className='whitespace-nowrap' align='center'>
              {index + 1}
            </Table.Td>
            <Table.Td
              className='cursor-pointer'
              onClick={() => {
                if (has_child) {
                  setAuthorityField(id);
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
  );
};

const BodyForOrganizationsAndChildren = ({ data, sortStates }) => {
  return (
    <Table.Tbody>
      {data?.map(({ id, title, has_child, data, children }, index) => {
        return (
          <Fragment key={id}>
            <Table.Tr className='bg-white dark:bg-main-blue'>
              <Table.Td className='whitespace-nowrap' align='center'>
                {index + 1}
              </Table.Td>
              <Table.Td>{title}</Table.Td>
              {Object.keys(data)?.map((column, index) => {
                return (
                  <Table.Td
                    className='whitespace-nowrap'
                    align='center'
                    key={`${title}-${column}-${index}`}
                  >
                    {data[column]}
                  </Table.Td>
                );
              })}
            </Table.Tr>
            <OrgChildren
              data={Array.isArray(children) ? children : [children]}
              sortStates={sortStates}
              parentIndex={index}
            />
          </Fragment>
        );
      })}
    </Table.Tbody>
  );
};

const OrgChildren = ({ data, sortStates, parentIndex }) => {
  const { setAuthorityField } = useFilterStore();
  const { sortedData } = useSort({ data, sortStates });
  return sortedData.map(({ id, title, has_child, ...rest }, childIndex) => {
    return (
      <Table.Tr key={id}>
        <Table.Td>
          {parentIndex + 1}.{childIndex + 1}
        </Table.Td>
        <Table.Td
          className='cursor-pointer'
          onClick={() => {
            if (has_child) setAuthorityField(id);
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
  });
};

export default TableView;
