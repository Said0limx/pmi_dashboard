import { useTranslations } from 'next-intl';

import { useAuthorityList } from '@/shared/api-hooks/main-filter';
import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';
import { usePageIndicator } from '@/shared/hooks/usePageIndicator';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const OrganizationsSelect = () => {
  const { organization } = useDetermineReportCategory();
  const { isSectionOfOrganizations } = usePageIndicator();
  if (!organization && !isSectionOfOrganizations) return null;
  return <Component />;
};

const Component = () => {
  const { data = [] } = useAuthorityList();
  const t = useTranslations();
  const {
    setAuthorityField,
    reportViewFields: { report_graphic_view_id },
  } = useFilterStore();

  return (
    <Select
      // key={areaFields.territory_type_id}
      label={t('Tashkilotlar')}
      placeholder={t('Tashkilotlar')}
      data={enumsMapper(
        report_graphic_view_id === 2 ? data : data.filter(({ has_child }) => has_child),
        { labelKey: 'title' },
      )}
      // value={String(areaFields.territory_type_id)}
      onChange={(value) => {
        setAuthorityField(value ? Number(value) : null);
      }}
    />
  );
};

export default OrganizationsSelect;
