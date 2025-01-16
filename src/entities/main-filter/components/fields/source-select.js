import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { usePathname } from '@/i18n/routing';
import { useSourceList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const SourceSelect = () => {
  const { data = [] } = useSourceList();
  const {
    source_id,
    setField,
    reportViewFields: { report_graphic_view_id, report_view_id },
  } = useFilterStore();
  const t = useTranslations();
  const pathname = usePathname();
  useEffect(() => {
    return () => {
      setField('source_id', null);
    };
  }, [setField]);
  if (report_graphic_view_id === 1 || report_view_id !== 2 || pathname !== '/sources') return null;
  return (
    <Select
      label={t('Manba')}
      placeholder={t('Manba')}
      name='source_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      value={String(source_id)}
      onChange={(value) => {
        setField('source_id', value ? Number(value) : null);
      }}
    />
  );
};

export default SourceSelect;
