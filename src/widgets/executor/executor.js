'use client';
import { ActionIcon, Badge, Button, Skeleton, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useFetch } from '@/shared/hooks';
import { ContentBox, Title } from '@/shared/ui';
import { makeImageUrl } from '@/shared/utils/make-image-url';

import ExecutorCreate from './executor-create';
import ExecutorDelete from './executor-delete';

export const Executor = ({ locale }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetch({
    key: 'admin/strategy-executor/list',
    url: '/admin/strategy-executor/list',
    method: 'POST',
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [initialValues, setInitialValues] = useState(null);
  const t = useTranslations();
  return (
    <div>
      <ContentBox className='w-full p-5 mb-5'>
        <div className='flex justify-between'>
          <Title>{t('Executor')}</Title>
          <Button variant='filled' onClick={open}>
            {t("Qo'shish")}
          </Button>
        </div>
      </ContentBox>
      <ExecutorCreate
        opened={opened}
        close={() => {
          close();
          setInitialValues(null);
        }}
        open={open}
        initialValues={initialValues}
      />
      <ContentBox>
        {isLoading && (
          <>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className='grid grid-cols-4 gap-2  mt-2 first:mb-4'>
                  <Skeleton height={35} radius='sm' />
                  <Skeleton height={35} radius='sm' />
                  <Skeleton height={35} radius='sm' />
                  <Skeleton height={35} radius='sm' />
                </div>
              ))}
          </>
        )}
        {!isLoading && (
          <Table withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={50}>№</Table.Th>
                <Table.Th>{t("To'liq ismi")}</Table.Th>
                <Table.Th>{t('Position')}</Table.Th>
                <Table.Th>{t('Authority')}</Table.Th>
                <Table.Th>{t('Enabled')}</Table.Th>
                <Table.Th w={50}>{t('Actions')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((item, index) => (
                <Table.Tr key={item.id}>
                  <Table.Td align='center'>{index + 1}</Table.Td>
                  <Table.Td>
                    <div className='flex items-center gap-2'>
                      <Image
                        key={item.personal_image_file}
                        src={makeImageUrl(item.personal_image_file)}
                        width={60}
                        height={60}
                        className='max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] object-cover rounded-full'
                        alt={item.personal_image_file}
                      />
                      {item.full_name}
                    </div>{' '}
                  </Table.Td>

                  <Table.Td>{item[`position_${locale}`]}</Table.Td>
                  <Table.Td>{item?.authority?.title}</Table.Td>
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
                            authority_title: item.authority.title,
                            first_name_oz: item.first_name_oz,
                            first_name_uz: item.first_name_uz,
                            first_name_ru: item.first_name_ru,
                            last_name_oz: item.last_name_oz,
                            last_name_uz: item.last_name_uz,
                            last_name_ru: item.last_name_ru,
                            middle_name_oz: item.middle_name_oz,
                            middle_name_uz: item.middle_name_uz,
                            middle_name_ru: item.middle_name_ru,
                            position_oz: item.position_oz,
                            position_uz: item.position_uz,
                            position_ru: item.position_ru,
                            authority_id: item.authority_id,
                            enabled: item.enabled ? '1' : '0',
                            personal_image_file: item.personal_image_file,
                          });
                        }}
                      >
                        <IconEdit size={18} stroke={1.5} />
                      </ActionIcon>
                      <ExecutorDelete
                        executorId={item.id}
                        onSuccess={() => {
                          queryClient.invalidateQueries({
                            queryKey: ['admin/strategy-executor/list'],
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
