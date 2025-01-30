'use client';
import { ActionIcon, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconEye } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link } from '@/i18n/routing';
import { useFetch } from '@/shared/hooks';

import SoatoUpdateCoordinator from './soato-update-coordinator';

export const SoatoRegion = () => {
  const locale = useLocale();
  const { region_id } = useParams();

  const queryClient = useQueryClient();

  const { data = [] } = useFetch({
    key: ['soato-region/list', region_id],
    url: '/soato-region/list',
    params: {
      include_original_title: true,
      is_parent: true,
      parent_id: region_id,
    },
  });

  const t = useTranslations();
  const [opened, { open, close }] = useDisclosure(false);
  const [initialValues, setInitialValues] = useState(null);
  return (
    <div>
      <SoatoUpdateCoordinator
        opened={opened}
        close={() => {
          close();
          setInitialValues(null);
        }}
        open={open}
        onSuccess={() => {
          queryClient.invalidateQueries({
            queryKey: ['soato-region/list', region_id],
          });
        }}
        initialValues={initialValues}
      />
      <Table withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th align='center' w={50}>
              №
            </Table.Th>
            <Table.Th>{t('Regions')}</Table.Th>
            <Table.Th w={60}>{t('Coordination')}</Table.Th>
            <Table.Th w={50}>{t('Actions')}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td align='center'>{index + 1}</Table.Td>
              <Table.Td>{item[`title_${locale}`]}</Table.Td>
              <Table.Td align='center'>{item.coordination ? 'Yes' : 'No'}</Table.Td>
              <Table.Td align='center'>
                <div className='flex gap-2 justify-center'>
                  <ActionIcon
                    variant='outline'
                    color='yellow'
                    onClick={() => {
                      open();
                      setInitialValues({
                        id: item.id,
                        coordination: item.coordination,
                      });
                    }}
                  >
                    <IconEdit size={18} stroke={1.5} />
                  </ActionIcon>
                  {!region_id && (
                    <ActionIcon variant='outline' color='blue'>
                      <Link href={`/settings/soato-region/${item.id}`}>
                        <IconEye size={18} stroke={1.5} />
                      </Link>
                    </ActionIcon>
                  )}
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};
