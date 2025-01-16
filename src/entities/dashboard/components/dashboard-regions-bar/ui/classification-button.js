import { IconArrowRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { useFilterStore } from '@/shared/store/use-filter-store';

export const ClassificationButton = () => {
  const t = useTranslations();
  const { setClassificationField } = useFilterStore();
  return (
    <div
      className={'flex items-center gap-2 border px-2 py-1 rounded-lg cursor-pointer'}
      onClick={() => {
        setClassificationField('is_dashboard_classification', true);
      }}
    >
      {t('Sohalar')} <IconArrowRight />
    </div>
  );
};
