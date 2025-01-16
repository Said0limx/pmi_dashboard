'use client';
import { useTranslations } from 'next-intl';

import { useReportRegionStatistics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import { BackButtonForClassifications, CustomLoader, DetermineArea, Title } from '@/shared/ui';
import NoDataUi from '@/shared/ui/no-data-ui/no-data-ui';

import GraphicView from './ui/graphic-view';
import TableView from './ui/table-view';

export const Statistics = () => {
  const { data: { headers = {}, data = [] } = {}, isFetching } = useReportRegionStatistics();
  const { isGraphicView, isTableView } = useDetermineReportView();
  const t = useTranslations();

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <BackButtonForClassifications />
          <Title>{t('Tasniflar kesimida')}</Title>
        </div>
        <DetermineArea />
      </div>

      <CustomLoader isLoading={isFetching} />
      <div className='mt-5 h-full'>
        {!isFetching && isTableView && <TableView headers={headers} data={data} />}
        {!isFetching && isGraphicView && <GraphicView headers={headers} data={data} />}
      </div>
      {!isFetching && !data?.length && <NoDataUi />}
    </>
  );
};
