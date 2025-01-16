import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react';

import { useReportTypeCategoryList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

import { usePageIndicator } from '../../../../shared/hooks/usePageIndicator';

const ReportCategorySelect = () => {
  const { data = [] } = useReportTypeCategoryList({});
  const { setReportViewField, reportViewFields, setAreaField } = useFilterStore();
  const { isClassification, isSectionOfOrganizations, isSectionOfRegions } = usePageIndicator();
  const t = useTranslations();
  useEffect(() => {
    return () => {
      setReportViewField('report_category_id', 1);
    };
  }, []);
  const { filteredData } = useMemo(() => {
    return {
      filteredData: data.filter((item) =>
        isClassification || isSectionOfOrganizations ? item.id !== 4 : true,
      ),
    };
  }, [data, isClassification, isSectionOfOrganizations]);
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if (isSectionOfRegions) {
        setReportViewField('report_category_id', 1);
      }
      if (isSectionOfOrganizations) {
        setReportViewField('report_category_id', 2);
      }
      if (isClassification) {
        setReportViewField('report_category_id', 3);
      }
    }
  }, [isClassification, isSectionOfOrganizations, isSectionOfRegions, setReportViewField]);

  if (isSectionOfRegions || isClassification || isSectionOfOrganizations) {
    return (
      <Select
        label={t('Xisobot toifasi')}
        placeholder={t('Xisobot toifasi')}
        name='report_category_id'
        data={enumsMapper(filteredData, { labelKey: 'title' })}
        clearable={false}
        value={String(reportViewFields.report_category_id)}
        onChange={(value) => {
          setReportViewField('report_category_id', value ? Number(value) : null);
          if (isClassification && value === '1') {
            setAreaField('region_id', null);
            setAreaField('district_id', null);
            setAreaField('mahalla_id', null);
          }
        }}
      />
    );
  }
  return null;
};

export default ReportCategorySelect;
