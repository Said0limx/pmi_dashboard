'use client';
import { Table, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { useGetProjectProblemList } from '@/entities/dashboard/hooks';
import { ContentBox, Loader } from '@/shared/ui';

const ProjectListTable = () => {
  const t = useTranslations();
  const { data = [], isPending } = useGetProjectProblemList();

  return (
    <ContentBox>
      <div className='tracking-tighter text-2xl leading-8 text-color font-bold'>
        {t('Muammoli loyihalar')}
      </div>
      {isPending ? (
        <div className='flex min-h-52 justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <Table
          style={(theme) => ({
            borderRadius: theme.radius.lg,
          })}
          // striped
          className='mt-6'
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={50}>#</Table.Th>
              <Table.Th>{t('Project name')}</Table.Th>
              <Table.Th>{t('Problem name')}</Table.Th>
              <Table.Th>{t('Authority title')}</Table.Th>
              <Table.Th>{t('Status')}</Table.Th>
              <Table.Th>{t('Start date')}</Table.Th>
              <Table.Th>{t('Finish date')}</Table.Th>
              <Table.Th>{t('Region title')}</Table.Th>
              <Table.Th>{t('District title')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item, index) => (
              <Table.Tr
                style={(theme) => ({
                  borderRadius: theme.radius.lg,
                })}
                key={index}
              >
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td className='max-w-[500px]'>{item.project_name}</Table.Td>
                <Table.Td className='max-w-[500px]'>{item.project_problem_title}</Table.Td>
                <Table.Td>{item.authority_title}</Table.Td>
                <Table.Td className='max-w-[500px]'>{item.project_status_title}</Table.Td>
                <Table.Td>
                  {item.start_date ? dayjs(item.start_date, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''}
                </Table.Td>
                <Table.Td>
                  {item.finish_date
                    ? dayjs(item.finish_date, 'YYYY-MM-DD').format('DD.MM.YYYY')
                    : ''}
                </Table.Td>
                <Table.Td>{item.region_title}</Table.Td>
                <Table.Td>{item.district_title}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </ContentBox>
  );
};

export default ProjectListTable;
