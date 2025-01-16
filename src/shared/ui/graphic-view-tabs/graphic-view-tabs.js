import { useMounted } from '@mantine/hooks';
import { useEffect } from 'react';

import { useReportGraphicTypesList } from '@/shared/api-hooks/main-filter';
import { useDetermineReportType, useDetermineReportView } from '@/shared/hooks';
import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';
import { usePageIndicator } from '@/shared/hooks/usePageIndicator';
import { useFilterStore } from '@/shared/store/use-filter-store';

const GraphicViewTabs = () => {
  const { classification, territory } = useDetermineReportCategory();
  const { isStats } = useDetermineReportType();
  const { isGraphicView } = useDetermineReportView();
  const mounted = useMounted();
  const { isClassification, isSectionOfRegions, isSectionOfOrganizations, isSource } =
    usePageIndicator();
  const { organization } = useDetermineReportCategory();
  if (
    !mounted ||
    (isSectionOfRegions && territory && isGraphicView && isStats) ||
    (isSectionOfOrganizations && isGraphicView && isStats && organization) ||
    (isClassification && classification && isGraphicView && isStats) ||
    (isSource && isGraphicView && isStats)
  )
    return <Component />;
  return null;
};

const Component = () => {
  const { data = [] } = useReportGraphicTypesList();
  const { setReportViewField, reportViewFields } = useFilterStore();

  useEffect(() => {
    return () => {
      setReportViewField('report_graphic_view_id', 1);
    };
  }, [setReportViewField]);
  return (
    <div className='border grid grid-cols-3 rounded border-slate-200 dark:border-main_blue_3 p-1 gap-1 text-sm'>
      {data.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-1 dark:hover:bg-main_blue_1 p-1 rounded text-color cursor-pointer tracking-tighter ${reportViewFields.report_graphic_view_id === item.id && 'dark:bg-main_blue_1 bg-slate-200'}`}
          onClick={() => {
            setReportViewField('report_graphic_view_id', item.id);
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default GraphicViewTabs;
