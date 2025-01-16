'use client';
import { useTranslations } from 'next-intl';

import { useClassificationsStatistics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import {
  BackButtonForAreas,
  BackButtonForClassifications,
  CustomLoader,
  DetermineArea,
  Title,
} from '@/shared/ui';
import { DetermineClassification } from '@/shared/ui/determine-classification';
import NoDataUi from '@/shared/ui/no-data-ui/no-data-ui';

import GraphicView from './ui/graphic-view.js';
import TableView from './ui/table-view';

export const Statistics = () => {
  const { data: { headers = {}, data = [] } = {}, isFetching } = useClassificationsStatistics();
  const { isTableView, isGraphicView } = useDetermineReportView();
  const t = useTranslations();

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <BackButtonForClassifications />
          <Title>{t('Tasniflar kesimida')}</Title>
        </div>
        <DetermineClassification />
      </div>

      <CustomLoader isLoading={isFetching} />
      <div className='mt-5 h-full'>
        {!isFetching && isTableView && <TableView headers={headers} data={data} />}
        {isGraphicView && <GraphicView headers={headers} data={data} isFetching={isFetching} />}
      </div>
      {!isFetching && !data?.length && <NoDataUi />}
    </>
  );
};
