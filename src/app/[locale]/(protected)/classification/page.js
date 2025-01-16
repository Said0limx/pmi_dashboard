'use client';

import InClassifications from '@/entities/classification/in-classifications/in-classifications';
import InOrganizations from '@/entities/classification/in-organizations/in-organizations';
import InTerritories from '@/entities/classification/in-territories/in-territories';
import PageLayout from '@/widgets/layout/page-layout';

const Classification = () => {
  return (
    <PageLayout>
      <InTerritories />
      <InOrganizations />
      <InClassifications />
    </PageLayout>
  );
};

export default Classification;
