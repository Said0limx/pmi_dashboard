'use client';
import { ActionIcon, Badge, Button, Skeleton, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft, IconEdit, IconEye } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useFetch } from '@/shared/hooks';
import { Title } from '@/shared/ui';
import { makeImageUrl } from '@/shared/utils/make-image-url';

import StrategyTaskCreate from './strategy-task-create';

export const StrategyTaskView = ({ strategyId, locale }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetch({
    key: `admin/strategy/${strategyId}/view`,
    url: `/admin/strategy/${strategyId}/view`,
  });
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [initialValues, setInitialValues] = useState(null);

  return (
    <div>
      <div className='w-full mb-5 sticky top-5 z-10 bg-color p-5 rounded-xl'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <Button
              leftSection={<IconArrowLeft size={14} />}
              variant='outline'
              onClick={() => router.back()}
            >
              Orqaga
            </Button>
            <Title>{data?.[`title_${locale}`]}</Title>
          </div>
          <Button variant='filled' onClick={open}>
            Qo'shish
          </Button>
        </div>
      </div>
      <StrategyTaskCreate
        opened={opened}
        close={() => {
          close();
          setInitialValues(null);
        }}
        open={open}
        initialValues={initialValues}
      />
      <div className='p-5 bg-color rounded-xl'>
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
          <div className='max-h-[700px] overflow-y-auto'>
            <Table withColumnBorders className='text-color'>
              <Table.Thead className='sticky top-0 bg-color'>
                <Table.Tr>
                  <Table.Th w={50}>№</Table.Th>
                  <Table.Th>Title OZ</Table.Th>
                  <Table.Th>Title UZ</Table.Th>
                  <Table.Th>Title RU</Table.Th>
                  <Table.Th>Executor</Table.Th>
                  <Table.Th w={50}>Sort</Table.Th>
                  <Table.Th w={70}>Icon</Table.Th>
                  <Table.Th w={50}>Enabled</Table.Th>
                  <Table.Th w={100}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data?.children?.map((item, index) => (
                  <Table.Tr key={item.id}>
                    <Table.Td align='center'>{index + 1}</Table.Td>
                    <Table.Td>{item.title_oz}</Table.Td>
                    <Table.Td>{item.title_uz}</Table.Td>
                    <Table.Td>{item.title_ru}</Table.Td>
                    <Table.Td>
                      <div className='flex gap-2 items-center'>
                        {item.executor?.personal_image_file ? (
                          <Image
                            key={item.icon_file}
                            src={makeImageUrl(item.executor?.personal_image_file)}
                            width={50}
                            height={50}
                            className='max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px] object-cover rounded-full'
                            alt={item.executor?.personal_image_file}
                          />
                        ) : null}
                        {item.executor?.full_name}
                      </div>
                    </Table.Td>
                    <Table.Td align='center'>{item.sort}</Table.Td>
                    <Table.Td align='center'>
                      {item.icon_file && (
                        <Image
                          key={item.icon_file}
                          src={makeImageUrl(item.icon_file)}
                          width={60}
                          height={60}
                          className='max-w-[60px] max-h-[60px] object-cover'
                          alt={item.icon_file}
                        />
                      )}
                    </Table.Td>
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
                              executor_id: item.executor ? String(item.executor?.id) : '',
                              title_oz: item.title_oz,
                              title_uz: item.title_uz,
                              title_ru: item.title_ru,
                              sort: String(item.sort),
                              enabled: item.enabled ? '1' : '0',
                              icon_file: item.icon_file,
                            });
                          }}
                        >
                          <IconEdit size={18} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon variant='outline' color='blue'>
                          <Link href={`${item.parent_id}/${item.id}`}>
                            <IconEye size={18} stroke={1.5} />
                          </Link>
                        </ActionIcon>
                        {/* <StrategyDelete
                          strategyId={item.id}
                          onSuccess={() => {
                            queryClient.invalidateQueries({
                              queryKey: [`admin/strategy/${strategyId}/view`],
                            });
                          }}
                        /> */}
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
