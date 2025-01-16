'use client';
import { useTranslations } from 'next-intl';

import { useAuthorityStatistics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import { BackButtonForOrganizations, CustomLoader, Title } from '@/shared/ui';
import { BreadcrumbForOrganizations } from '@/shared/ui/breadcrumb-for-organizations';
import NoDataUi from '@/shared/ui/no-data-ui/no-data-ui';

import { GraphicView } from './ui/graphic-view';
import TableView from './ui/table-view';

export const Statistics = () => {
  const { data: { headers = {}, data = [] } = {}, isFetching } = useAuthorityStatistics();
  const { isGraphicView, isTableView } = useDetermineReportView();

  const t = useTranslations();

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <BackButtonForOrganizations />
          <Title>{t('Tashkilotlar kesimida')}</Title>
        </div>
      </div>
      <BreadcrumbForOrganizations breadcrumbs={headers.breadcrumbs} />
      <CustomLoader isLoading={isFetching} />
      <div className='mt-5 h-full'>
        {isTableView && <TableView headers={headers} data={data} isLoading={isFetching} />}
        {isGraphicView && <GraphicView headers={headers} data={data} isLoading={isFetching} />}
      </div>
      {!isFetching && !data?.length && <NoDataUi />}
    </>
  );
};
