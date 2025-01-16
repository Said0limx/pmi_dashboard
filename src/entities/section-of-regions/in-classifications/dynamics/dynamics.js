'use client';

import { useTranslations } from 'next-intl';

import { useReportRegionDynamics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import { BackButtonForClassifications, CustomLoader, DetermineArea, Title } from '@/shared/ui';
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
  const t = useTranslations();
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <BackButtonForClassifications />
          <Title>{t('Tasniflar kesimida')}</Title>
        </div>
        <DetermineArea />
      </div>
      <CustomLoader isLoading={isFetching} />
      {!isLoading && !isFetching && data?.length > 0 ? (
        <>
          <div className='mt-5 h-full'>
            {isTableView && <TableView data={data} headers={headers} />}
            {isGraphicView && <GraphicView data={data} headers={headers} />}
          </div>
        </>
      ) : null}
      {!isLoading && !isFetching && !data?.length && <NoDataUi />}
    </>
  );
};
