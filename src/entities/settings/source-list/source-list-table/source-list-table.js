import { ActionIcon, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { ContentBox } from '@/shared/ui';

import { useGetSourceList } from './hooks/use-get-colors-list';

const SourceListTable = ({ openEditModal }) => {
  const t = useTranslations();
  const { data = [] } = useGetSourceList({
    params: { include_original_title: true },
  });
  console.log(data);

  return (
    <ContentBox>
      <Table
        style={(theme) => ({
          borderRadius: theme.radius.lg,
        })}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={50}>#</Table.Th>
            <Table.Th>{t('Title')}</Table.Th>
            <Table.Th>{t('Created at')}</Table.Th>
            <Table.Th>{t('Updated at')}</Table.Th>
            <Table.Th>{t('HEX')}</Table.Th>
            <Table.Th w={100}>{t('Actions')}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{item.title}</Table.Td>
              <Table.Td>
                {item.created_at ? dayjs(item.created_at).format('DD.MM.YYYY') : ''}
              </Table.Td>
              <Table.Td>
                {item.updated_at ? dayjs(item.updated_at).format('DD.MM.YYYY') : ''}
              </Table.Td>
              <Table.Td>
                <div className='flex gap-2 items-center'>
                  <div style={{ background: item.color }} className='w-5 h-5'></div>
                  {item.color}
                </div>
              </Table.Td>
              <Table.Td className='flex gap-2 items-center'>
                <ActionIcon
                  variant='outline'
                  onClick={() =>
                    openEditModal({
                      id: item.id,
                      title_uz: item.title_uz,
                      title_ru: item.title_ru,
                      title_oz: item.title_oz,
                      title_en: item.title_en,
                      color: item.color,
                      title: item.title,
                    })
                  }
                >
                  <IconEdit />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ContentBox>
  );
};

export default SourceListTable;
