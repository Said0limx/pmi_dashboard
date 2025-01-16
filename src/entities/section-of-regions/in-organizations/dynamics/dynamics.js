'use client';

import { useTranslations } from 'next-intl';

import { useReportRegionDynamics } from '@/shared/api-hooks';
import { useDetermineReportView, useDetermineTimePeriod } from '@/shared/hooks';
import { BackButtonForOrganizations, CustomLoader, DetermineArea, Title } from '@/shared/ui';
import { BreadcrumbForOrganizations } from '@/shared/ui/breadcrumb-for-organizations';
import NoDataUi from '@/shared/ui/no-data-ui/no-data-ui';

import GraphicView from './graphic-view';
import TableView from './table-view';

export const Dynamics = () => {
  const {
    data: { headers = {}, data = [] } = {},
    isLoading,
    isFetching,
  } = useReportRegionDynamics();
  const { isTableView, isGraphicView } = useDetermineReportView();
  const { isTimePeriod } = useDetermineTimePeriod();
  const t = useTranslations();

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <BackButtonForOrganizations />
          <Title>{t('Tashkilotlar kesimida')}</Title>
        </div>
        <DetermineArea />
      </div>
      <BreadcrumbForOrganizations breadcrumbs={headers.breadcrumbs} />
      <CustomLoader isLoading={isFetching} />
      {!isLoading && !isFetching && data?.length > 0 ? (
        <>
          <div className='mt-5 h-full'>
            {isTimePeriod && isTableView && <TableView data={data} headers={headers} />}
            {isTimePeriod && isGraphicView && <GraphicView data={data} headers={headers} />}
          </div>
        </>
      ) : null}
      {!isLoading && !isFetching && !data?.length && <NoDataUi />}
    </>
  );
};
