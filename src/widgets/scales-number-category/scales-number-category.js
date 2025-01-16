'use client';
import { ActionIcon, Badge, Button, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useScalesNumberCategoryList } from '@/shared/api-hooks';
import { ContentBox, Title } from '@/shared/ui';
import TableSkeleton from '@/shared/ui/table-skeleton/table-skeleton';

import ScalesNumberCategoryCreate from './scales-number-category-create';
import ScalesNumberCategoryDelete from './scales-number-category-delete';

export const ScalesNumberCategory = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useScalesNumberCategoryList();

  const [opened, { open, close }] = useDisclosure(false);
  const [initialValues, setInitialValues] = useState(null);
  return (
    <div>
      <ContentBox className='w-full p-5 mb-5'>
        <div className='flex justify-between'>
          <Title>Scales number category</Title>
          <Button variant='filled' onClick={open}>
            Qo'shish
          </Button>
        </div>
      </ContentBox>
      <ScalesNumberCategoryCreate
        opened={opened}
        close={() => {
          close();
          setInitialValues(null);
        }}
        open={open}
        initialValues={initialValues}
      />
      <ContentBox>
        {isLoading && <TableSkeleton />}
        {!isLoading && (
          <Table withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={50}>№</Table.Th>
                <Table.Th>Title OZ</Table.Th>
                <Table.Th>Title UZ</Table.Th>
                <Table.Th>Title RU</Table.Th>
                <Table.Th>Code name</Table.Th>
                <Table.Th w={150}>Sana</Table.Th>
                <Table.Th w={50}>Enabled</Table.Th>
                <Table.Th w={50}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((item, index) => (
                <Table.Tr key={item.id}>
                  <Table.Td align='center'>{index + 1}</Table.Td>
                  <Table.Td>{item[`title_oz`]}</Table.Td>
                  <Table.Td>{item[`title_uz`]}</Table.Td>
                  <Table.Td>{item[`title_ru`]}</Table.Td>
                  <Table.Td>{item.code_name}</Table.Td>
                  <Table.Td>{dayjs(item.created_at).format('DD.MM.YYYY HH:mm')}</Table.Td>
                  <Table.Td align='center'>
                    {item.enabled ? (
                      <Badge color='blue'>Faol</Badge>
                    ) : (
                      <Badge color='red'>Nofaol</Badge>
                    )}
                  </Table.Td>
                  <Table.Td align='center'>
                    <div className='flex gap-1'>
                      <ActionIcon
                        variant='outline'
                        color='yellow'
                        onClick={() => {
                          open();
                          setInitialValues({
                            id: item.id,
                            title_oz: item.title_oz,
                            title_uz: item.title_uz,
                            title_ru: item.title_ru,
                            code_name: item.code_name,
                            enabled: item.enabled ? '1' : '0',
                          });
                        }}
                      >
                        <IconEdit size={18} stroke={1.5} />
                      </ActionIcon>
                      <ScalesNumberCategoryDelete
                        id={item.id}
                        onSuccess={() => {
                          queryClient.invalidateQueries({
                            queryKey: ['admin/scales-number-category/list'],
                          });
                        }}
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </ContentBox>
    </div>
  );
};
