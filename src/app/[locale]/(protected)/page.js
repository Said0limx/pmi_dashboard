'use client';
import { DashboardFilter } from '@/entities/dashboard/components/dashboard-filter/dashboard-filter';
import DashboardBody from '@/entities/dashboard/dashboard-body';

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-5'>
      <DashboardBody />
    </div>
  );
};

export default Dashboard;
