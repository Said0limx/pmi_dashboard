'use client';

import { useTranslations } from 'next-intl';

import { useGetProblemProjectRisksCount, useGetProblemProjectTypesCount } from '../dashboard/hooks';
import RiskPieChart from './pie-chart-3d/risk-pie-chart-3d';
import TypePieChart from './pie-chart-3d/type-pie-chart-3d';
import ProjectListTable from './project-list-table/project-list-table';
import Statuses from './statuses/statuses';

const ProblematicProjects = () => {
  const t = useTranslations();
  const { data: risksdata = [], isPendingRisks } = useGetProblemProjectRisksCount();
  const { data: typesdata = [], isPendingTypes } = useGetProblemProjectTypesCount();

  return (
    <div className='flex flex-col gap-8'>
      <Statuses />
      <div className='grid grid-cols-2 gap-8'>
        <RiskPieChart
          name={t('Risk')}
          data={risksdata}
          loading={isPendingRisks}
          title={t('Xavf darajasi')}
        />
        <TypePieChart
          name={t('Type')}
          data={typesdata}
          loading={isPendingTypes}
          title={t('Muammo turlari')}
        />
      </div>
      <ProjectListTable />
    </div>
  );
};

export default ProblematicProjects;
