import { useDetermineReportType } from '@/shared/hooks';

import { useDetermineReportCategory } from '../../../shared/hooks/use-determine-report-category';
import { Dynamics } from './dynamics';
import { Statistics } from './statistics';

const InSources = () => {
  const { isStats, isDynamic } = useDetermineReportType();
  const { sources } = useDetermineReportCategory();
  if (!sources) {
    return null;
  }
  return (
    <>
      {isStats && <Statistics />}
      {isDynamic && <Dynamics />}
    </>
  );
};

export default InSources;
