import { ActionIcon, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { ContentBox } from '@/shared/ui';

import { useGetColorsList } from './hooks/use-get-colors-list';

const ColorsListTable = ({ openDeleteModal, openEditModal }) => {
  const t = useTranslations();
  const { data = [] } = useGetColorsList({
    params: { color_type_id: 1, include_original_title: true },
  });

  return (
    <ContentBox>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={50}>#</Table.Th>
            <Table.Th>{t('Title UZ')}</Table.Th>
            <Table.Th>{t('Title RU')}</Table.Th>
            <Table.Th>{t('Title OZ')}</Table.Th>
            <Table.Th>{t('HEX')}</Table.Th>
            <Table.Th>{t('RGB')}</Table.Th>
            <Table.Th w={100}>{t('Actions')}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.id}</Table.Td>
              <Table.Td>{item.title_uz}</Table.Td>
              <Table.Td>{item.title_ru}</Table.Td>
              <Table.Td>{item.title_oz}</Table.Td>
              <Table.Td className='flex gap-2 items-center'>
                <div style={{ background: item.hex_code }} className='w-5 h-5'></div>
                {item.hex_code}
              </Table.Td>
              <Table.Td>{item.rgb}</Table.Td>
              <Table.Td className='flex gap-2 items-center'>
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

export default ColorsListTable;
