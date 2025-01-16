import { Button, Pagination, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useFetch } from '@/shared/hooks';
import { ContentBox, CustomLoader } from '@/shared/ui';

import ModalForm from './modal-form';

const TranslationsForRegionsClassificationsOrganizations = ({ listUrl, listKey, updateUrl }) => {
  const [selected, setSelected] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [page, setPage] = useState(1);
  const { data: { data, last_page = 0, meta } = {}, isLoading } = useFetch({
    url: listUrl,
    key: listKey,
    params: { pageSize: 20, page },
    dataKey: null,
  });

  const t = useTranslations();
  return (
    <div>
      <ModalForm
        opened={opened}
        close={close}
        selected={selected}
        setSelected={setSelected}
        listKey={listKey}
        url={updateUrl}
      />
      <ContentBox>
        <div className='h-[600px] overflow-auto'>
          {isLoading && <CustomLoader isLoading={isLoading} />}
          {!isLoading && (
            <Table stickyHeader>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w={50}>{t('#')}</Table.Th>
                  <Table.Th>{t('Title UZ')}</Table.Th>
                  <Table.Th>{t('Title OZ')}</Table.Th>
                  <Table.Th>{t('Title RU')}</Table.Th>
                  <Table.Th w={80}>{t('Actions')}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data?.map((item, index) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{item.title_uz}</Table.Td>
                    <Table.Td>{item.title_oz}</Table.Td>
                    <Table.Td>{item.title_ru}</Table.Td>
                    <Table.Td>
                      <Button
                        onClick={() => {
                          setSelected(item);
                          open();
                        }}
                      >
                        <IconEdit />
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </div>
        <Pagination
          className='mt-5'
          value={page}
          total={last_page || meta?.last_page}
          onChange={(page) => setPage(page)}
        />
      </ContentBox>
    </div>
  );
};

export default TranslationsForRegionsClassificationsOrganizations;
