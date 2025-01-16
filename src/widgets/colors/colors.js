'use client';
import { ActionIcon, Badge, Button, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconEye } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useFetch } from '@/shared/hooks';
import { ContentBox, Title } from '@/shared/ui';
import TableSkeleton from '@/shared/ui/table-skeleton/table-skeleton';

import ScalesColorsCreate from './scales-colors-create';
import ScalesNumberDelete from './scales-colors-delete';

export const Colors = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetch({
    key: 'admin/scales-color/list',
    url: '/admin/scales-color/list',
    method: 'get',
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [initialValues, setInitialValues] = useState(null);
  const t = useTranslations();
  return (
    <div>
      <ContentBox className='w-full p-5 mb-5'>
        <div className='flex justify-between'>
          <Title>Scales colors</Title>
          <Button variant='filled' onClick={open}>
            Qo'shish
          </Button>
        </div>
      </ContentBox>
      <ScalesColorsCreate
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
                <Table.Th>Scale table</Table.Th>
                <Table.Th>Scale setting</Table.Th>
                <Table.Th>Model</Table.Th>
                <Table.Th w={50}>Enabled</Table.Th>
                <Table.Th w={50}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((item, index) => (
                <Table.Tr key={item.id}>
                  <Table.Td align='center'>{index + 1}</Table.Td>
                  <Table.Td>{item.scale_table}</Table.Td>
                  <Table.Td>{item.scale_setting}</Table.Td>
                  <Table.Td>{item.model}</Table.Td>
                  <Table.Td>
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
                            scale_table_id: String(item.scale_table_id),
                            scale_setting_id: String(item.scale_setting_id),
                            scale_number_category_id: String(item.scale_number_category_id),
                            fields: item.fields.map((item) => ({
                              color: item.color,
                              field_id: String(item.id),
                            })),
                            enabled: item.enabled ? '1' : '0',
                          });
                        }}
                      >
                        <IconEdit size={18} stroke={1.5} />
                      </ActionIcon>
                      <ActionIcon variant='outline' color='blue'>
                        <Link href={`#`}>
                          <IconEye size={18} stroke={1.5} />
                        </Link>
                      </ActionIcon>
                      <ScalesNumberDelete
                        id={item.id}
                        onSuccess={() => {
                          queryClient.invalidateQueries({
                            queryKey: ['admin/scales-color/list'],
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
