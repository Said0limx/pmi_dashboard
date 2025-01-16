import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useFetch } from '@/shared/hooks';
import { ContentBox, Title } from '@/shared/ui';

import CatalogForm from './catalog-form';
import CatalogSelect from './catalog-select';
import SelectedCatalogListSelect from './selected-catalog-list-select';

export const Catalog = () => {
  const [catalog, setSelectedCatalog] = useState(null);
  const [selected, setSelected] = useState(null);

  const { data, isLoading } = useFetch({
    key: catalog?.list,
    url: catalog?.list,
    params: {
      ...(catalog?.value === '10' || catalog?.value === '11'
        ? {
            period_year_id: 7,
          }
        : {}),
      include_original_title: true,
    },
    queryOptions: {
      enabled: !!catalog,
    },
  });
  const t = useTranslations();
  return (
    <>
      <ContentBox className='w-full p-5 mb-5'>
        <div className='flex justify-between'>
          <Title>{t('Catalog')}</Title>
        </div>
      </ContentBox>
      <ContentBox>
        <CatalogSelect
          selected={catalog}
          setSelected={setSelectedCatalog}
          onChange={() => {
            setSelected(null);
          }}
        />

        {!!catalog && !isLoading && (
          <>
            <SelectedCatalogListSelect
              key={selected?.id}
              catalog={catalog}
              selected={selected}
              setSelected={setSelected}
              data={data}
            />
            {selected && (
              <CatalogForm
                selected={selected}
                url={catalog?.url}
                setSelected={setSelected}
                listKey={catalog?.list}
              />
            )}
          </>
        )}
      </ContentBox>
    </>
  );
};
