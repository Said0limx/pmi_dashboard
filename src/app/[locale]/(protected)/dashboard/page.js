'use client';
import { useMounted } from '@mantine/hooks';

import { DashboardMap } from '@/entities/dashboard/components/dashboard-map/dashboard-map';
import DashboardSkeleton from '@/entities/dashboard/components/dashboard-skeleton/dashboard-skeleton';
import { DegreeOfSolvingAppeals } from '@/entities/dashboard/components/degree-of-solving-appeals/degree-of-solving-appeals';
import SphereBarChartContainer from '@/entities/dashboard/components/sphere-bar-chart/sphere-bar-chart-container';
import ByRegions from '@/entities/section-of-branches/by-regions/by-regions';
import { useValidateParams } from '@/shared/hooks/use-validate-params';

function Dashboard() {
  const loadParams = useValidateParams();
  const mounted = useMounted();
  if (!loadParams || !mounted) {
    return <DashboardSkeleton />;
  }

  return (
    <div className='flex flex-col gap-5'>
      {/* <DashboardFilter /> */}
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <div className='mb-5'>
            <DegreeOfSolvingAppeals isLabelsHide />
            {/* <AppealsCountByEmployment /> */}
          </div>
          {/* <DashboardRegionsBar /> */}
        </div>
        <DashboardMap />
      </div>
      <div className='grid xl:grid-cols-2 gap-5'>
        <SphereBarChartContainer />
        <ByRegions />

        {/* <NumberOfAppealsInSourceSection /> */}
        {/* <DashboardLineChart /> */}
      </div>
    </div>
  );
}

export default Dashboard;
