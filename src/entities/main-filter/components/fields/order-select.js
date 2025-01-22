'use client';
import { useTranslations } from 'next-intl';

import { useOrderList } from '@/shared/api-hooks/main-filter';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const OrderSelect = ({ filterOptions = (data) => data }) => {
  const { data = [] } = useOrderList();
  const { order_id, setField } = useFilterStore();

  const t = useTranslations();

  return (
    <Select
      label={t('Hujjat')}
      placeholder={t('Hujjat')}
      name='order_id'
      value={String(order_id)}
      onChange={(value) => setField('order_id', value ? Number(value) : null)}
      data={filterOptions(enumsMapper(data, { labelKey: 'title' }))}
    />
  );
};

export default OrderSelect;
