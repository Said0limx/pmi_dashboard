'use client';
import { keepPreviousData } from '@tanstack/react-query';

import { useSourcesStatistics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import { Loader } from '@/shared/ui';
import NoDataUi from '@/shared/ui/no-data-ui/no-data-ui';

import GraphicView from './graphic-view';
import SourceStatisticsTableView from './source-statistics-table-view';

export const SourcesStatistics = () => {
  const queryResult = useSourcesStatistics({
    queryOptions: {
      placeholderData: keepPreviousData,
    },
  });

  const { isGraphicView, isTableView } = useDetermineReportView();

  const { isFetching, data: { data = [] } = {} } = queryResult;

  return (
    <>
      {isFetching && (
        <div className='h-full flex justify-center items-center'>
          <Loader />
        </div>
      )}
      {data.length ? (
        <>
          {isTableView && <SourceStatisticsTableView {...queryResult} />}
          {isGraphicView && <GraphicView {...queryResult} />}
        </>
      ) : null}
      {!isFetching && !data.length && <NoDataUi />}
    </>
  );
};
