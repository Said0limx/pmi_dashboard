'use client';

import { useClassificationsStatistics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import { CustomLoader } from '@/shared/ui';

import NoData from '../../../../shared/ui/no-data';
import GraphicView from './ui/graphic-view';
import Header from './ui/header';
import { TableView } from './ui/table-view';

export const Statistics = () => {
  const { data: { headers = {}, data = [] } = {}, isFetching } = useClassificationsStatistics();
  const { isTableView, isGraphicView } = useDetermineReportView();

  return (
    <>
      <Header />
      <CustomLoader isLoading={isFetching} />
      {!isFetching && data?.length > 0
        ? isTableView && <TableView data={data} headers={headers} />
        : null}
      {isGraphicView && <GraphicView data={data} headers={headers} isLoading={isFetching} />}
      <NoData dataLength={data?.length} isLoading={isFetching} />
    </>
  );
};
