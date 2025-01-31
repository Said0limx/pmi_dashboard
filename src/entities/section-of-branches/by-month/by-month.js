'use client';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useTasksByMonth } from '@/entities/dashboard/hooks';
import { useFormatNum, useStrokeColor } from '@/shared/hooks';
import { LoadingOverlay } from '@/shared/ui';

function generateData(data) {
  if (!data?.length) return [];

  const result = data.map((item) => {
    return {
      title: item.label,
      plan: Number(item.plan_amount),
      fact: Number(item.fact_amount),
      month: Number(item.month),
    };
  });

  return result;
}

export default function ByMonth() {
  const t = useTranslations();
  const { data, isLoading } = useTasksByMonth();
  const stroke = useStrokeColor();
  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className='p-5 after:rounded-[1.25rem] rounded-[1.25rem] relative after:absolute after:inset-0 after:bg-content_box_bg dark:after:bg-main_blue_5 after:-z-10 shadow-[2px_3px_7.9px_1px_#0000000A]'>
        <div className='flex justify-between items-center pb-5'>
          <Title size='lg'>{t("Oylar bo'yicha o'zlashtirish")}</Title>
        </div>
        <ResponsiveContainer width='100%' height={400}>
          <ComposedChart data={generateData(data?.data)}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              tick={{ fill: stroke }}
              dataKey='title'
              angle={-20}
              textAnchor='end'
              interval={0}
              height={70}
            />
            <YAxis tick={{ fill: stroke }} />
            <Tooltip
              cursor={{ fill: stroke, opacity: 0.1 }}
              contentStyle={{ color: '#000' }}
              content={<CustomTooltip />}
            />
            {/* <Legend visibility={'hidden'} /> */}
            <CartesianGrid stroke='#f5f5f5' />
            {/* <Area type='monotone' dataKey='plan' fill='#41bbfa' stroke='#8884d8' hide />
          <Area type='monotone' dataKey='fact' fill='#9747ff' stroke='#8884d8' hide /> */}
            <Bar dataKey='plan' barSize={20} name={t('Reja')} fill='#41bbfa' />
            <Bar dataKey='fact' barSize={20} name={t('Fakt')} fill='#9747ff' />
            {/* <Line
            type='monotone'
            className='text-none'
            name={null}
            dataKey='plan'
            fillOpacity={0.3}
          />
          <Line type='monotone' name={null} dataKey='fact' stroke='#9747ff' /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </LoadingOverlay>
  );
}

const CustomTooltip = ({ active, payload }) => {
  const { formatNum } = useFormatNum();
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', padding: '10px', borderRadius: '5px' }}>
        {payload?.slice(0, 2).map((entry, index) => {
          return (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatNum(entry.value)}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};
