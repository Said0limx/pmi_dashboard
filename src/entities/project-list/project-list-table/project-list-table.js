import { Table } from '@mantine/core';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import { ContentBox } from '@/shared/ui';

import { useGetProjectList } from './hooks/use-project-list';

const ProjectListTable = () => {
  const t = useTranslations();
  const { data = [] } = useGetProjectList({
    body: {
      period_type_id: 2,
      period_id: null,
      period_year_id: 7,
      period_month_id: 1,
      order_id: null,
      region_id: null,

      abroad_country_id: 792,
      complex_ids: [],
      sphere_id: null,
      source_id: null,
      industry_id: null,
      authority_id: null,
    },
  });

  return (
    <ContentBox>
      <Table>
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
          {data.map((item) => (
            <Table.Tr key={item.project_id}>
              <Table.Td>{item.project_id}</Table.Td>
              <Table.Td className='max-w-[500px]'>{item.project_name}</Table.Td>
              <Table.Td>
                {item.start_date ? dayjs(item.start_date, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''}
              </Table.Td>
              <Table.Td>
                {item.finish_date ? dayjs(item.finish_date, 'YYYY-MM-DD').format('DD.MM.YYYY') : ''}
              </Table.Td>
              <Table.Td>{item.authority_title}</Table.Td>
              <Table.Td>{item.region_title}</Table.Td>
              <Table.Td>{item.district_title}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ContentBox>
  );
};

export default ProjectListTable;
