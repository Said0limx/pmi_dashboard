'use client';
import { useMounted } from '@mantine/hooks';
import { IconChartHistogram, IconColumns } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { useFilterStore } from '@/shared/store/use-filter-store';

const ReportViewTabs = () => {
  const t = useTranslations();
  const { setReportViewField, reportViewFields } = useFilterStore();
  const mounted = useMounted();

  if (!mounted) return null;
  return (
    <div className='border grid grid-cols-2 rounded border-slate-200 dark:border-main_blue_3 p-1 gap-1 text-sm'>
      <div
        className={`flex items-center gap-1 dark:hover:bg-main_blue_1 p-1 rounded text-color cursor-pointer tracking-tighter ${reportViewFields.report_view_id === 1 && 'dark:bg-main_blue_1 bg-slate-200'}`}
        onClick={() => {
          setReportViewField('report_view_id', 1);
        }}
      >
        <IconColumns size={16} /> {t('Table view')}
      </div>
      <div
        className={`flex items-center gap-1 dark:hover:bg-main_blue_1 p-1 rounded text-color cursor-pointer tracking-tighter ${reportViewFields.report_view_id === 2 && 'dark:bg-main_blue_1 bg-slate-200'}`}
        onClick={() => setReportViewField('report_view_id', 2)}
      >
        <IconChartHistogram size={16} /> {t('Graphic view')}
      </div>
    </div>
  );
};

export default ReportViewTabs;
