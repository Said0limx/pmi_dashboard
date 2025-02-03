import { ActionIcon, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { ContentBox } from '@/shared/ui';

import { useGetColorsFieldList } from './hooks/use-get-colors-list';

const ColorsFieldListTable = ({ openDeleteModal, openEditModal }) => {
  const t = useTranslations();
  const { data = [] } = useGetColorsFieldList({
    params: { include_original_title: true },
  });

  return (
    <ContentBox className='bg-transparent'>
      <Table
        className='bg-[#1F2C7B] text-white'
        style={(theme) => ({
          borderRadius: theme.radius.xl,
        })}
      >
        <Table.Thead>
          <Table.Tr className='text-1xl h-16 border-b-0'>
            <Table.Th w={50} className='rounded-tl-3xl rounded-bl-3xl pl-4'>
              #
            </Table.Th>
            <Table.Th>{t('Title UZ')}</Table.Th>
            <Table.Th>{t('Title RU')}</Table.Th>
            <Table.Th>{t('Title OZ')}</Table.Th>
            <Table.Th>{t('Created at')}</Table.Th>
            <Table.Th>{t('Updated at')}</Table.Th>
            <Table.Th className=' gap-2 items-center rounded-tr-3xl rounded-br-3xl pr-4'>
              {t('Actions')}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className='font-medium'>
          {data.map((item, index) => (
            <Table.Tr key={item.id}>
              <Table.Td className='rounded-tl-3xl rounded-bl-3xl pl-4'>{index + 1}</Table.Td>
              <Table.Td>{item.title_uz}</Table.Td>
              <Table.Td>{item.title_ru}</Table.Td>
              <Table.Td>{item.title_oz}</Table.Td>
              <Table.Td>
                {item.created_at ? dayjs(item.created_at).format('DD.MM.YYYY') : ''}
              </Table.Td>
              <Table.Td>
                {item.updated_at ? dayjs(item.updated_at).format('DD.MM.YYYY') : ''}
              </Table.Td>

              <Table.Td className='flex gap-2 items-center mt-4'>
                <ActionIcon
                  variant='outline'
                  onClick={() =>
                    openEditModal({
                      id: item.id,
                      title_uz: item.title_uz,
                      title_ru: item.title_ru,
                      title_oz: item.title_oz,
                      hex_code: item.hex_code,
                      rgb: item.rgb,
                    })
                  }
                >
                  <IconEdit />
                </ActionIcon>
                <ActionIcon variant='outline' color='red' onClick={() => openDeleteModal(item.id)}>
                  <IconTrash size={18} stroke={1.5} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ContentBox>
  );
};

export default ColorsFieldListTable;
