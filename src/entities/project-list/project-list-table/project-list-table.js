import { Table } from '@mantine/core';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { useGetProjectList } from '@/entities/dashboard/hooks';
import { ContentBox, Loader, PaginationAdvanced } from '@/shared/ui';

const ProjectListTable = () => {
  const t = useTranslations();
  const { data, isPending, paginationProps } = useGetProjectList();

  return (
    <ContentBox>
      {isPending ? (
        <div className='flex min-h-52 justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <Table
          style={(theme) => ({
            borderRadius: theme.radius.lg,
          })}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>#</Table.Th>
              <Table.Th>{t('Project name')}</Table.Th>
              <Table.Th>{t('Start date')}</Table.Th>
              <Table.Th>{t('Finish date')}</Table.Th>
              <Table.Th>{t('Authority title')}</Table.Th>
              <Table.Th>{t('Region title')}</Table.Th>
              <Table.Th>{t('District title')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.data?.map((item, index) => (
              <Table.Tr key={item.project_id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td className='max-w-[500px]'>{item.project_name}</Table.Td>
                <Table.Td>
                  {item.start_date ? dayjs(item.start_date, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''}
                </Table.Td>
                <Table.Td>
                  {item.finish_date
                    ? dayjs(item.finish_date, 'YYYY-MM-DD').format('DD.MM.YYYY')
                    : ''}
                </Table.Td>
                <Table.Td>{item.authority_title}</Table.Td>
                <Table.Td>{item.region_title}</Table.Td>
                <Table.Td>{item.district_title}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
      {paginationProps?.pageCount > 1 && (
        <div className='mt-5 flex gap-2'>
          <PaginationAdvanced paginationProps={paginationProps} />
        </div>
      )}
    </ContentBox>
  );
};

export default ProjectListTable;
