import { ActionIcon, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { ContentBox } from '@/shared/ui';

import { useGetAssignColorsList } from './hooks/use-get-assign-colors-list';

const AssignColorsListTable = ({ openEditModal }) => {
  const t = useTranslations();
  const { data = [] } = useGetAssignColorsList();

  return (
    <ContentBox>
      <Table
        style={(theme) => ({
          borderRadius: theme.radius.lg,
        })}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={50} className='className=' text-1xl h-16 border-b-0>
              #
            </Table.Th>
            <Table.Th>{t('Field')}</Table.Th>
            <Table.Th>{t('Color')}</Table.Th>
            <Table.Th>{t('HEX')}</Table.Th>
            <Table.Th>{t('RGB')}</Table.Th>
            <Table.Th w={100}>{t('Actions')}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item, index) => (
            <Table.Tr key={index}>
              <Table.Td>{index + 1}</Table.Td>
              <Table.Td>{item.field}</Table.Td>
              <Table.Td>{item.color}</Table.Td>
              <Table.Td className='flex gap-2 items-center'>
                <div style={{ background: item.hexCode }} className='w-5 h-5'></div>
                {item.hexCode}
              </Table.Td>
              <Table.Td>{item.rgba}</Table.Td>
              <Table.Td className='flex gap-2 items-center'>
                <ActionIcon
                  variant='outline'
                  onClick={() =>
                    openEditModal({
                      id: item.field_id,
                      field_id: item.field_id,
                      color_id: item.color_id,
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

export default AssignColorsListTable;
