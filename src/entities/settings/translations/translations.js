'use client';
import { Table, TextInput } from '@mantine/core';
import { useDebouncedValue, useToggle } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { memo, useMemo, useState } from 'react';

import { DeleteItem } from '@/features/delete-item/delete-item';
import { useFetch } from '@/shared/hooks';
import usePagination from '@/shared/hooks/use-pagination/use-pagination';
import { ContentBox, Loader, Pagination } from '@/shared/ui';

import CategorySelect from './category-id-select';
import FileIdSelect from './file-id-select';
import TranslationTableRow from './translation-table-row';
import TranslationsHeader from './translations-header';

const Translations = () => {
  const [filterValues, setFilterValues] = useState({
    key: '',
    value: '',
    file_id: null,
    folder_id: null,
  });
  const [debouncedValues] = useDebouncedValue(filterValues, 500);
  const { data = [], isFetching } = useFetch({
    key: 'translations-list',
    url: '/admin/language-translate/list',
    method: 'POST',
    body: debouncedValues,
  });
  const queryClient = useQueryClient();
  const [ids, setIds] = useState([]);
  const [opened, toggle] = useToggle([false, true]);
  const { start, end, pageCount, changePage, previousPage, nextPage, pageNumber } = usePagination(
    data,
    30,
  );
  const t = useTranslations();
  const slicedData = useMemo(() => data.slice(start, end), [data, start, end]);
  return (
    <div className='mt-5'>
      <TranslationsHeader />
      <DeleteItem
        url={`/admin/language-translate/delete`}
        onSuccess={() => {
          setIds([]);
          queryClient.invalidateQueries({ queryKey: ['translations-list'] });
        }}
        opened={opened}
        close={toggle}
        data={{ ids }}
      />
      <div className='mt-5'>
        <ContentBox>
          <div className='overflow-y-auto h-[65vh]'>
            <Table withColumnBorders stickyHeader>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w={250}>
                    <TextInput
                      label={t('Translation key')}
                      placeholder={t('Translation key')}
                      value={filterValues.key}
                      onChange={(e) => setFilterValues({ ...filterValues, key: e.target.value })}
                    />
                  </Table.Th>
                  <Table.Th>
                    <TextInput
                      label={t('Translation value')}
                      placeholder={t('Translation value')}
                      value={filterValues.value}
                      onChange={(e) => setFilterValues({ ...filterValues, value: e.target.value })}
                    />
                  </Table.Th>
                  <Table.Th>
                    <FileIdSelect setValues={setFilterValues} values={filterValues} />
                  </Table.Th>
                  <Table.Th>
                    {' '}
                    <CategorySelect setValues={setFilterValues} values={filterValues} />
                  </Table.Th>
                  <Table.Th w={200}>{t('Actions')}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <TableBody slicedData={slicedData} setIds={setIds} toggle={toggle} />
            </Table>
            {isFetching && (
              <div className='h-[90vh] flex items-center justify-center'>
                <Loader />
              </div>
            )}
          </div>
          {pageCount > 1 && (
            <div className='mt-5 flex gap-2'>
              <Pagination
                pageCount={pageCount}
                changePage={changePage}
                previousPage={previousPage}
                nextPage={nextPage}
                pageNumber={pageNumber}
              />
            </div>
          )}
        </ContentBox>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const TableBody = memo(({ slicedData, setIds, toggle }) => {
  return (
    <Table.Tbody>
      {slicedData.map((item, index) => {
        return (
          <TranslationTableRow
            key={`${index}-${item.key}`}
            item={item}
            setIds={setIds}
            toggle={toggle}
          />
        );
      })}
    </Table.Tbody>
  );
});

export default Translations;
