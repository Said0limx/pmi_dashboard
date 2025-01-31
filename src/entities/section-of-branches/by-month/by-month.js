'use client';
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useFetch } from '@/shared/hooks';
function generateData(data) {
  //   if (!data.length) return [];

  //   const result = data.map((item) => {
  //     return {
  //       title: item.title,
  //       plan: Number(item.plan_amount),
  //       fact: Number(item.fact_amount),
  //       amt: Number(item.plan_amount),
  //     };
  //   });

  return [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
}

export default function ByMonth() {
  const { data = [] } = useFetch({
    key: 'sphere-list',
    url: '/dashboard/sphere-list',
    method: 'POST',
    body: {
      period_type_id: 2,
      period_year_id: 7,
      period_id: null,
      period_month_id: null,
      order_id: null,
      region_id: null,

      abroad_country_id: null,
      sphere_id: null,
      industry_id: null,
      complex_ids: [],
      authority_id: null,
    },
  });
  return (
    <div className='p-5 after:rounded-[1.25rem] rounded-[1.25rem] relative after:absolute after:inset-0 after:bg-content_box_bg dark:after:bg-main_blue_5 after:-z-10 shadow-[2px_3px_7.9px_1px_#0000000A]'>
      <ResponsiveContainer width='100%' height={400}>
        <ComposedChart data={generateData()}>
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke='#f5f5f5' />
          <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8' />
          <Bar dataKey='pv' barSize={20} fill='#41bbfa' />
          <Bar dataKey='uv' barSize={20} fill='#9747ff' />
          <Line type='monotone' dataKey='uv' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
