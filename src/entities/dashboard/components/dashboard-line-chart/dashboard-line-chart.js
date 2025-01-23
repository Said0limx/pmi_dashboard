import { useTranslations } from 'next-intl';

import { Title } from '@/shared/ui';
import LineView from '@/shared/ui/line-view';

import { useLineChart } from '../../hooks';

function DashboardLineChart() {
  const { data, isLoading } = useLineChart();
  const { t } = useTranslations();
  return (
    <div>
      <Title>{t('Oylar kesimida o‘zlashtirish')}</Title>
      <LineView data={data?.data} headers={data?.headers} isLoading={isLoading} />
    </div>
  );
}

export default DashboardLineChart;
