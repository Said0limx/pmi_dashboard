import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useFilterStore } from '@/shared/store/use-filter-store';

export const BackButtonForOrganizations = () => {
  const t = useTranslations();
  const { authority_ids, removeAuthorityField } = useFilterStore();
  if (!authority_ids.length) return null;
  return <Button onClick={() => removeAuthorityField()}>{t('Orqaga')}</Button>;
};
