import { useDetermineReportType } from '@/shared/hooks';

import { useDetermineReportCategory } from '../../../shared/hooks/use-determine-report-category';
import { Dynamics } from './dynamics';
import { Statistics } from './statistics';

const InOrganizations = () => {
  const { isStats, isDynamic } = useDetermineReportType();
  const { organization } = useDetermineReportCategory();

  if (!organization) {
    return null;
  }
  return (
    <>
      {isStats && <Statistics />}
      {isDynamic && <Dynamics />}
    </>
  );
};
export default InOrganizations;
