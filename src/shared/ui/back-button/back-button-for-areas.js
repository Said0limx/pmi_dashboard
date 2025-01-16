'use client';

import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { useFilterStore } from '@/shared/store/use-filter-store';

export const BackButtonForAreas = ({ onClick = () => {} }) => {
  const { setAreaField, areaFields } = useFilterStore();
  const t = useTranslations();
  if (!areaFields.region_id && !areaFields.district_id) return null;
  return (
    <Button
      onClick={() => {
        if (areaFields.region_id && areaFields.district_id && areaFields.mahalla_id) {
          setAreaField('mahalla_id', null);
        } else if (areaFields.region_id && areaFields.district_id) {
          setAreaField('district_id', null);
        } else {
          setAreaField('region_id', null);
        }
        onClick();
      }}
    >
      {t('Orqaga')}
    </Button>
  );
};
