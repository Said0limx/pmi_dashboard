import { useTranslations } from 'next-intl';

import { useReportTypesList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const ReportTypeSelect = () => {
  const { data = [] } = useReportTypesList();
  const { setReportViewField, reportViewFields, setPeriodField, periodFields } = useFilterStore();
  const t = useTranslations();
  return (
    <Select
      label={t('Hisobot turi')}
      placeholder={t('Hisobot turi')}
      name='report_type_id'
      clearable={false}
      value={String(reportViewFields.report_type_id)}
      data={enumsMapper(data, { labelKey: 'title' })}
      onChange={(value) => {
        setReportViewField('report_type_id', value ? Number(value) : null);
      }}
    />
  );
};

export default ReportTypeSelect;
