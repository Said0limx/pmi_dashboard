import { useDetermineReportType } from '@/shared/hooks';
import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';

import { Dynamics } from './dynamics';
import { Statistics } from './statistics';

const InTerritories = () => {
  const { isStats, isDynamic } = useDetermineReportType();
  const { territory } = useDetermineReportCategory();
  if (!territory) {
    return null;
  }
  return (
    <>
      {isStats && <Statistics />}
      {isDynamic && <Dynamics />}
    </>
  );
};

export default InTerritories;
