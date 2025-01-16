import { useTranslations } from 'next-intl';

import { useAuthorityTerritorialityList } from '@/shared/api-hooks/main-filter';
import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

import { usePageIndicator } from '../../../../shared/hooks/usePageIndicator';

const AuthorityTerritorialitySelect = () => {
  const { isSectionOfRegions } = usePageIndicator();
  if (isSectionOfRegions) return <Component />;
  return null;
};

const Component = () => {
  const { data = [] } = useAuthorityTerritorialityList();
  const t = useTranslations();
  const {
    setAreaField,
    areaFields: { authority_territoriality_type_id },
  } = useFilterStore();
  const { organization } = useDetermineReportCategory();

  if (!organization) {
    return null;
  }

  return (
    <Select
      label={t('Hududiylik turi')}
      placeholder={t('Hududiylik turi')}
      data={enumsMapper(data, { labelKey: 'title' })}
      value={String(authority_territoriality_type_id)}
      onChange={(value) => {
        setAreaField('authority_territoriality_type_id', value ? Number(value) : null);
      }}
    />
  );
};

export default AuthorityTerritorialitySelect;
