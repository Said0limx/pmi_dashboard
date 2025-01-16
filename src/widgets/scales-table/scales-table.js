'use client';
import { ActionIcon, Badge, Button, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconEye } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useScalesTableList } from '@/shared/api-hooks';
import { ContentBox, Title } from '@/shared/ui';
import TableSkeleton from '@/shared/ui/table-skeleton/table-skeleton';

import ScalesTableCreate from './scales-table-create';
import ScalesTableDelete from './scales-table-delete';

export const ScalesTable = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useScalesTableList();
  const t = useTranslations();
  const [opened, { open, close }] = useDisclosure(false);
  const [initialValues, setInitialValues] = useState(null);
  return (
    <div>
      <ContentBox className='w-full p-5 mb-5'>
        <div className='flex justify-between'>
          <Title>{t('Scales table')}</Title>
          <Button variant='filled' onClick={open}>
            {t("Qo'shish")}
          </Button>
        </div>
      </ContentBox>
      <ScalesTableCreate
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
                <Table.Th>{t('Title OZ')}</Table.Th>
                <Table.Th>{t('Title UZ')}</Table.Th>
                <Table.Th>{t('Title RU')}</Table.Th>
                <Table.Th>{t('Code name')}</Table.Th>
                <Table.Th w={150}>{t('Sana')}</Table.Th>
                <Table.Th w={50}>{t('Enabled')}</Table.Th>
                <Table.Th w={50}>{t('Actions')}</Table.Th>
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
                      <Badge color='blue'>{t('Faol')}</Badge>
                    ) : (
                      <Badge color='red'>{t('Nofaol')}</Badge>
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
                            scale_setting_id: String(item.scale_setting_id),
                            enabled: item.enabled ? '1' : '0',
                          });
                        }}
                      >
                        <IconEdit size={18} stroke={1.5} />
                      </ActionIcon>
                      <ActionIcon variant='outline' color='blue'>
                        <Link href={`scales-table/${item.id}`}>
                          <IconEye size={18} stroke={1.5} />
                        </Link>
                      </ActionIcon>
                      <ScalesTableDelete
                        id={item.id}
                        onSuccess={() => {
                          queryClient.invalidateQueries({
                            queryKey: ['admin/scales-table/list'],
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
