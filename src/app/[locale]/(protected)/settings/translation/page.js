'use client';
import { useState } from 'react';

import { Catalog } from '@/entities/settings/catalog';
import TranslationTypes from '@/entities/settings/translations/translation-types';
import Translations from '@/entities/settings/translations/translations';
import TranslationsForRegionsClassificationsOrganizations from '@/entities/settings/translations-for-regions-classifications-organizations/translations-for-regions-classifications-organizations';

const Page = () => {
  const [translationType, setTranslationType] = useState(0);

  return (
    <div>
      <TranslationTypes translationType={translationType} setTranslationType={setTranslationType} />
      {translationType === 0 && <Translations />}
      {translationType === 1 && <Catalog />}
      {translationType === 2 && (
        <TranslationsForRegionsClassificationsOrganizations
          listUrl={'/admin/classification/list'}
          listKey={'/admin/classification-list'}
          updateUrl={'/admin/classification/edit'}
        />
      )}
      {translationType === 3 && (
        <TranslationsForRegionsClassificationsOrganizations
          listUrl={'/admin/soato-region/list'}
          listKey={'/admin/soato-region/list'}
          updateUrl={'/admin/soato-region/edit'}
        />
      )}
      {translationType === 4 && (
        <TranslationsForRegionsClassificationsOrganizations
          listUrl={'/admin/mahalla/list'}
          listKey={'/admin/mahalla-list'}
          updateUrl={'/admin/mahalla/edit'}
        />
      )}
      {translationType === 5 && (
        <TranslationsForRegionsClassificationsOrganizations
          listUrl={'/authority/list?include_original_title=true'}
          listKey={'/authority-list'}
          updateUrl={'authority/edit'}
        />
      )}
    </div>
  );
};

export default Page;
