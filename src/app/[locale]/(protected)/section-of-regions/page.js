'use client';

import InClassifications from '@/entities/section-of-regions/in-classifications/in-classifications';
import InOrganizations from '@/entities/section-of-regions/in-organizations/in-organizations';
import InSources from '@/entities/section-of-regions/in-sources/in-sources';
import InTerritories from '@/entities/section-of-regions/in-territories/in-territories';
import PageLayout from '@/widgets/layout/page-layout';

const SectionOfRegions = () => {
  return (
    <PageLayout>
      <InTerritories />
      <InOrganizations />
      <InClassifications />
      <InSources />
    </PageLayout>
  );
};

export default SectionOfRegions;
