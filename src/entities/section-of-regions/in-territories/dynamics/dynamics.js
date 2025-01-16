'use client';

import { useReportRegionDynamics } from '@/shared/api-hooks';
import { useDetermineReportView, useDetermineTimePeriod } from '@/shared/hooks';
import { CustomLoader } from '@/shared/ui';
import NoData from '@/shared/ui/no-data';

import GraphicView from './ui/graphic-view';
import Header from './ui/header';
import TableView from './ui/table-view';

export const Dynamics = () => {
  const { data: { headers = {}, data = [] } = {}, isFetching } = useReportRegionDynamics();
  const { isTableView, isGraphicView } = useDetermineReportView();

  return (
    <>
      <Header />
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
