'use client';
import { useTranslations } from 'next-intl';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useTasksByRegionMap } from '@/entities/dashboard/hooks';
function generateData(data) {
  if (!data?.length) return [];

  const result = data.map((item) => {
    return {
      title: item.title,
      plan: Number(item.plan_amount),
      fact: Number(item.fact_amount),
    };
  });

  return result;
}

export default function ByRegions() {
  const t = useTranslations();

  const { data = {} } = useTasksByRegionMap();
  return (
    <div className='p-5 after:rounded-[1.25rem] rounded-[1.25rem] relative after:absolute after:inset-0 after:bg-content_box_bg dark:after:bg-main_blue_5 after:-z-10 shadow-[2px_3px_7.9px_1px_#0000000A]'>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={generateData(data?.data)}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='title' angle={-15} textAnchor='end' interval={0} height={70} />
          <YAxis />
          <Tooltip cursor={{ fill: '#fff', opacity: 0.1 }} contentStyle={{ color: '#000' }} />
          <Legend />
          <Bar dataKey='plan' name={t('Reja')} fill='#41bbfa' />
          <Bar dataKey='fact' name={t('Fakt')} fill='#9747ff' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
