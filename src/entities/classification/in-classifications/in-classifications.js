import { useDetermineReportType } from '@/shared/hooks';
import { useDetermineReportCategory } from '@/shared/hooks/use-determine-report-category';

import { Dynamics } from './dynamics';
import { Statistics } from './statistics';

const InClassifications = () => {
  const { isStats, isDynamic } = useDetermineReportType();
  const { classification } = useDetermineReportCategory();
  if (!classification) {
    return null;
  }
  return (
    <>
      {isStats && <Statistics />}
      {isDynamic && <Dynamics />}
    </>
  );
};
export default InClassifications;
