'use client';
import { useTranslations } from 'next-intl';

import { useAuthorityStatistics } from '@/shared/api-hooks';
import { useDetermineReportView } from '@/shared/hooks';
import { BackButtonForClassifications, CustomLoader, Title } from '@/shared/ui';
import { BreadcrumbForOrganizations } from '@/shared/ui/breadcrumb-for-organizations';
import { DetermineClassification } from '@/shared/ui/determine-classification';
import NoDataUi from '@/shared/ui/no-data-ui/no-data-ui';

import GraphicView from './ui/graphic-view';
import TableView from './ui/table-view';

export const Statistics = () => {
  const {
    data: { headers = {}, data = [] } = {},
    isFetching,
    isError,
    error,
  } = useAuthorityStatistics();
  const { isGraphicView, isTableView } = useDetermineReportView();
  const t = useTranslations();
  if (isError) {
    return (
      <div className='flex h-full justify-center items-center'>
        {error.response.data?.data.map((error, index) => {
          return (
            <p key={index} className='font-bold'>
              {error.message}
            </p>
          );
        })}
      </div>
    );
  }
  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <BackButtonForClassifications />
          <Title>{t('Tasniflar kesimida')}</Title>
        </div>
        <DetermineClassification />
      </div>
      <BreadcrumbForOrganizations breadcrumbs={headers.breadcrumbs} />
      <CustomLoader isLoading={isFetching} />
      <div className='mt-5 h-full'>
        {!isFetching && isTableView && <TableView headers={headers} data={data} />}
        {!isFetching && isGraphicView && <GraphicView headers={headers} data={data} />}
      </div>
      {!isFetching && !data?.length && <NoDataUi />}
    </>
  );
};
