'use client';

import { useAuthorityDynamics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import { CustomLoader } from '@/shared/ui';
import { BreadcrumbForOrganizations } from '@/shared/ui/breadcrumb-for-organizations';
import NoData from '@/shared/ui/no-data';

import GraphicView from './ui/graphic-view';
import Header from './ui/header';
import TableView from './ui/table-view';

export const Dynamics = () => {
  const { data: { headers = {}, data = [] } = {}, isFetching } = useAuthorityDynamics();
  const { isTableView, isGraphicView } = useDetermineReportView();
  return (
    <>
      <Header />
      <BreadcrumbForOrganizations breadcrumbs={headers.breadcrumbs} />
      <CustomLoader isLoading={isFetching} />
      {!isFetching && data?.length > 0 ? (
        <>
          {isTableView && <TableView data={data} headers={headers} />}
          {isGraphicView && <GraphicView data={data} headers={headers} />}
        </>
      ) : null}
      <NoData dataLength={data?.length} isLoading={isFetching} />
    </>
  );
};
