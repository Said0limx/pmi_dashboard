import { ActionIcon, Badge, Skeleton, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import Image from 'next/image';
import { useState } from 'react';

import { useFetch } from '@/shared/hooks';
import { ContentBox, Title } from '@/shared/ui';
import { makeImageUrl } from '@/shared/utils/make-image-url';

import StrategyCreate from './strategy-create';

export const Strategy = () => {
  const { data, isLoading } = useFetch({
    key: 'country/list',
    url: '/country/list',
    params: {
      include_original_title: true,
    },
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [initialValues, setInitialValues] = useState(null);
  return (
    <div>
      <ContentBox className='w-full p-5 mb-5'>
        <div className='flex justify-between'>
          <Title>Country</Title>
        </div>
      </ContentBox>
      <StrategyCreate
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
                <Table.Th>Title OZ</Table.Th>
                <Table.Th>Title UZ</Table.Th>
                <Table.Th>Title RU</Table.Th>
                <Table.Th w={50}>Sort</Table.Th>
                <Table.Th w={70}>Icon</Table.Th>
                <Table.Th w={50}>Enabled</Table.Th>
                <Table.Th w={100}>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.map((item, index) => (
                <Table.Tr key={item.id}>
                  <Table.Td align='center'>{index + 1}</Table.Td>
                  <Table.Td>{item.title_oz}</Table.Td>
                  <Table.Td>{item.title_uz}</Table.Td>
                  <Table.Td>{item.title_ru}</Table.Td>
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
                    <div className='flex justify-center gap-1'>
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
                            short_title_oz: item.short_title_oz ?? '',
                            short_title_uz: item.short_title_uz ?? '',
                            short_title_ru: item.short_title_ru ?? '',
                            sort: String(item.sort),
                            enabled: item.enabled ? '1' : '0',
                            icon_file: item.icon_file,
                          });
                        }}
                      >
                        <IconEdit size={18} stroke={1.5} />
                      </ActionIcon>
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
