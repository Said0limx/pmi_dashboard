import { Breadcrumbs } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { reverseArray } from '@/shared/lib/utils';
import { useFilterStore } from '@/shared/store/use-filter-store';

export const BreadcrumbForOrganizations = ({ breadcrumbs = [] }) => {
  const t = useTranslations();
  const { clearAuthorityField, removeAuthorityFieldsUntilAuthorityId } = useFilterStore();
  return (
    <div className='flex items-center mt-3 gap-2'>
      {breadcrumbs.length ? (
        <div className='cursor-pointer' onClick={clearAuthorityField}>
          {t('Ortga')}:
        </div>
      ) : null}
      <Breadcrumbs separatorMargin='md'>
        {reverseArray([...breadcrumbs])?.map((item) => (
          <div
            key={item.id}
            className='cursor-pointer hover:underline'
            onClick={() => {
              removeAuthorityFieldsUntilAuthorityId(item.id);
            }}
          >
            {item.title}
          </div>
        ))}
      </Breadcrumbs>
    </div>
  );
};
