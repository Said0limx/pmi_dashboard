import { usePathname } from 'next/navigation';

export const usePageIndicator = () => {
  const pathname = usePathname();

  const slicedPathname = pathname.split('/').slice(2).join('/');
  const isDashboard = slicedPathname === '';
  const isSectionOfRegions = slicedPathname === 'section-of-regions';
  const isSectionOfOrganizations = slicedPathname === 'section-of-organizations';
  const isClassification = slicedPathname === 'classification';
  const isSource = slicedPathname === 'sources';
  return {
    isDashboard,
    isSectionOfRegions,
    isSectionOfOrganizations,
    isClassification,
    isSource,
  };
};
