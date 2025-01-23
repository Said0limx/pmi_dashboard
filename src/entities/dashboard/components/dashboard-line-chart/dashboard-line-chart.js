import LineView from '@/shared/ui/line-view';

import { useLineChart } from '../../hooks';

function DashboardLineChart() {
  const { data, isLoading } = useLineChart();

  return (
    <div>
      <LineView data={data?.data} headers={data?.headers} isLoading={isLoading} />
    </div>
  );
}

export default DashboardLineChart;
