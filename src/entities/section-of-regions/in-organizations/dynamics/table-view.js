import { Table } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import useSort from '@/shared/hooks/use-sort';
import { useAuthStore } from '@/shared/store/use-auth-store';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { SortIcons } from '@/shared/ui';

const TableView = ({ data, headers }) => {
  const main_column_key = Object.keys(headers.main_column_key);
  const subColumns = Object.keys(headers.sub_column_key);
  const t = useTranslations();
  const { authority_ids } = useFilterStore();
  const { userDetails } = useAuthStore();
  const { title, executor_authority_id, has_child, type_title, type_id, ...rest } =
    authority_ids.length ? data[0].children[0] : data[0] || {};
  const subColumnKeys = Object.keys(rest);
  const { sort, sortKey, sortType } = useSort({ data });

  return (
    <div className='overflow-auto max-h-[85%] mantine-table-container'>
      <Table withRowBorders withColumnBorders stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th rowSpan={2} w={50} className='text-center'>
              №
            </Table.Th>
            <Table.Th rowSpan={2} w={500} className='min-w-[350px]' align='center'>
              {t('Tashkilotlar')}
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
                <div className='flex items-center justify-center gap-2 cursor-pointer'>
                  {headers.sub_column_key[subColumn]}
                  {subColumnKeys[index] === sortKey && <SortIcons sortType={sortType} />}
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
      {sortedData?.map(({ title, id, has_child, ...rest }, index) => {
        return (
          <Table.Tr key={id}>
            <Table.Td align='center'>{index + 1}</Table.Td>
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
            {Object.keys(rest).map((key, index) => (
              <Table.Td align='center' key={index} className='whitespace-nowrap'>
                {rest[key]}
              </Table.Td>
            ))}
          </Table.Tr>
        );
      })}
    </Table.Tbody>
  );
};

const BodyForOrganizationsAndChildren = ({ data, sortStates }) => {
  const { setAuthorityField } = useFilterStore();

  return (
    <Table.Tbody>
      {data?.map(({ title, id, has_child, children, data }, index) => {
        const { is_additional, ...rest } = data;
        return (
          <Fragment key={id}>
            <Table.Tr className='bg-white dark:bg-main-blue'>
              <Table.Td align='center'>{index + 1}</Table.Td>
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
              {Object.keys(rest).map((key, index) => (
                <Table.Td align='center' key={index} className='whitespace-nowrap'>
                  {rest[key]}
                </Table.Td>
              ))}
            </Table.Tr>
            <OrgChildren data={children} sortStates={sortStates} parentIndex={index} />
          </Fragment>
        );
      })}
    </Table.Tbody>
  );
};

const OrgChildren = ({ data, sortStates, parentIndex }) => {
  const { sortedData } = useSort({ data, sortStates });
  const { setAuthorityField } = useFilterStore();
  return sortedData?.map(
    (
      { title, executor_authority_id, has_child, type_title, type_id, is_additional, ...rest },
      childIndex,
    ) => {
      return (
        <Table.Tr key={executor_authority_id}>
          <Table.Td align='center'>
            {parentIndex + 1}.{childIndex + 1}
          </Table.Td>
          <Table.Td
            className='cursor-pointer'
            onClick={() => {
              if (has_child) {
                setAuthorityField(executor_authority_id);
              }
            }}
          >
            {title}
          </Table.Td>
          {Object.keys(rest).map((key, index) => (
            <Table.Td align='center' key={index} className='whitespace-nowrap'>
              {rest[key]}
            </Table.Td>
          ))}
        </Table.Tr>
      );
    },
  );
};

export default TableView;
