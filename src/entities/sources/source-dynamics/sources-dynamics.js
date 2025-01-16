'use client';
import { keepPreviousData } from '@tanstack/react-query';

import { useSourcesDynamics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import { Loader } from '@/shared/ui';
import NoDataUi from '@/shared/ui/no-data-ui/no-data-ui';

import GraphicView from './graphic-view';
import TableView from './table-view';

export const SourcesDynamics = () => {
  const queryResult = useSourcesDynamics({
    queryOptions: {
      placeholderData: keepPreviousData,
    },
  });

  const { isLoading, isFetching, data: { data = [] } = {} } = queryResult;
  const { isGraphicView, isTableView } = useDetermineReportView();
  return (
    <>
      {(isLoading || isFetching) && (
        <div className='h-full flex justify-center items-center'>
          <Loader />
        </div>
      )}
      <div className='mt-5 h-full'>
        {!isLoading && !isFetching && data.length ? (
          <>
            {isTableView && <TableView {...queryResult} />}
            {isGraphicView && <GraphicView {...queryResult} />}
          </>
        ) : null}
      </div>
      {!isLoading && !isFetching && !data.length && <NoDataUi />}
    </>
  );
};
