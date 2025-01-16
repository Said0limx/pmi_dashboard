import { useTranslations } from 'next-intl';

import { useReportRegionStatistics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import { BackButtonForAreas, CustomLoader, DetermineArea, Title } from '@/shared/ui';

import { GraphicView } from './ui/graphic-view';
import { TableView } from './ui/table-view';

export const Statistics = () => {
  const { data: { headers = {}, data = [] } = {}, isFetching } = useReportRegionStatistics();
  const { isTableView, isGraphicView } = useDetermineReportView();
  const t = useTranslations();

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <BackButtonForAreas />
          <Title>{t('Hududlar statistikasi manbalar kesimida')}</Title>
        </div>
        <DetermineArea />
      </div>
      <CustomLoader isLoading={isFetching} />
      {!isFetching && data?.length > 0 ? (
        <div className='mt-5 h-full'>
          {isTableView && <TableView data={data} headers={headers} />}
          {isGraphicView && <GraphicView data={data} headers={headers} />}
        </div>
      ) : null}
    </>
  );
};
