'use client';

import InClassifications from '@/entities/section-of-organizations/in-classifications/in-classifications';
import InOrganizations from '@/entities/section-of-organizations/in-organizations/in-organizations';
import InTerritories from '@/entities/section-of-organizations/in-territories/in-territories';
import PageLayout from '@/widgets/layout/page-layout';

const SectionOfOrganizations = () => {
  return (
    <PageLayout>
      <InTerritories />
      <InOrganizations />
      <InClassifications />
    </PageLayout>
  );
};

export default SectionOfOrganizations;
