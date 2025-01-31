'use client';
import { useMounted } from '@mantine/hooks';

import { DashboardMap } from '@/entities/dashboard/components/dashboard-map/dashboard-map';
import { DashboardRegionsBar } from '@/entities/dashboard/components/dashboard-regions-bar/dashboard-regions-bar';
import DashboardSkeleton from '@/entities/dashboard/components/dashboard-skeleton/dashboard-skeleton';
import { DegreeOfSolvingAppeals } from '@/entities/dashboard/components/degree-of-solving-appeals/degree-of-solving-appeals';
import { NumberOfAppealsInSourceSection } from '@/entities/dashboard/components/number-of-appeals-in-source-section';
import { useValidateParams } from '@/shared/hooks/use-validate-params';

import CountryBarChartContainer from './components/country-bar-chart-container';
import DashboardLineChart from './components/dashboard-line-chart/dashboard-line-chart';

const DashboardBody = () => {
  const loadParams = useValidateParams();
  const mounted = useMounted();
  if (!loadParams || !mounted) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-5'>
        <DashboardMap />
        <div>
          <div className='mb-4'>
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
      <CountryBarChartContainer />
    </>
  );
};

export default DashboardBody;
