import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';

import { usePageIndicator } from '../../../../shared/hooks/usePageIndicator';
import DistrictsSelect from '../fields/districts-select';
import MahallaSelect from '../fields/mahalla-select';
import RegionsSelect from '../fields/regions-select';

const AreaFields = () => {
  const { territory } = useDetermineReportCategory();
  const { isSectionOfRegions } = usePageIndicator();
  if (!territory && !isSectionOfRegions) return null;
  return (
    <>
      <RegionsSelect />
      <DistrictsSelect />
      <MahallaSelect />
    </>
  );
};

export default AreaFields;
