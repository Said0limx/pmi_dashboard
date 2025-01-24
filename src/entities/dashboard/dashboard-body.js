'use client';
import { useMounted } from '@mantine/hooks';

import { AppealsCountByEmployment } from '@/entities/dashboard/components/appeals-count-by-employment/appeals-count-by-employment';
import { Classifications } from '@/entities/dashboard/components/classifications';
import { DashboardMap } from '@/entities/dashboard/components/dashboard-map/dashboard-map';
import { DashboardRegionsBar } from '@/entities/dashboard/components/dashboard-regions-bar/dashboard-regions-bar';
import DashboardSkeleton from '@/entities/dashboard/components/dashboard-skeleton/dashboard-skeleton';
import { DegreeOfSolvingAppeals } from '@/entities/dashboard/components/degree-of-solving-appeals/degree-of-solving-appeals';
import { NumberOfAppealsInSourceSection } from '@/entities/dashboard/components/number-of-appeals-in-source-section';
import { useValidateParams } from '@/shared/hooks/use-validate-params';
import { useFilterStore } from '@/shared/store/use-filter-store';

import AuthorityBarChartContainer from './components/authority-bar-chart-container';
import DashboardLineChart from './components/dashboard-line-chart/dashboard-line-chart';

const DashboardBody = () => {
  const {
    classificationFields: { is_dashboard_classification },
  } = useFilterStore();
  const loadParams = useValidateParams();
  const mounted = useMounted();
  if (!loadParams || !mounted) {
    return <DashboardSkeleton />;
  }
  if (is_dashboard_classification) {
    return (
      <div className={'grid grid-cols-2 gap-5'}>
        <DashboardMap /> <Classifications />
      </div>
    );
  }
  return (
    <>
      <div className='grid grid-cols-2 gap-5 '>
        <DashboardMap />
        <div>
          <div className='mb-5'>
            <DegreeOfSolvingAppeals />
            {/* <AppealsCountByEmployment /> */}
          </div>
          <DashboardRegionsBar />
        </div>
      </div>
      <div className='grid xl:grid-cols-2 gap-5'>
        <NumberOfAppealsInSourceSection />
        <DashboardLineChart />
      </div>
      <AuthorityBarChartContainer />
    </>
  );
};

export default DashboardBody;
