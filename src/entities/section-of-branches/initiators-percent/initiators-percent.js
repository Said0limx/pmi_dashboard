'use client';
import { Switch, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-toastify';
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

import { useDashboardAuthorityList } from '@/entities/dashboard/hooks';
import { useFormatNum, useStrokeColor } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
import { LoadingOverlay } from '@/shared/ui';
function generateData(data, isShowAll) {
  if (!data?.length) return [];

  const result = data?.slice(0, isShowAll ? data?.length : 20)?.map((item) => {
    return {
      title: item.title,
      plan: Number(item.plan_amount),
      fact: Number(item.fact_amount),
      month: Number(item.month),
      factColor: '#9747ff',
      planColor: '#41bbfa',
      id: item.id,
    };
  });

  return result;
}
export default function InitiatorsPercent() {
  const t = useTranslations('');
  const { data = {}, isLoading } = useDashboardAuthorityList();
  const stroke = useStrokeColor();
  const { setField, authority_id } = useFilterStore();
  const [isShowAll, setIsShowAll] = useState(false);
  const handleClick = (el) => {
    if (el?.id) {
      setField('authority_id', el.id);
    } else {
      toast.error(t('ID mavjud emas'));
    }
  };

  const handleBack = () => {
    setField('authority_id', null);
  };

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div className='p-5 rounded-[20px] h-[400px] dark:bg-main_blue_5'>
        <div className='flex gap-2 items-center mb-2 justify-between'>
          <Title size='lg'>{t('Tashabbuskorlarning o‘zlashtirish foizi')}</Title>{' '}
          <div className='flex items-center gap-3'>
            <Switch
              checked={isShowAll}
              onChange={(e) => setIsShowAll(e.target.checked)}
              label={t('Barchasi')}
              labelPosition='left'
            />
            {authority_id && (
              <div
                onClick={handleBack}
                className={'flex items-center gap-2 border px-2 rounded-lg cursor-pointer h-[40px]'}
              >
                <IconArrowLeft />
                {t('Orqaga')}
              </div>
            )}
          </div>
        </div>
        <ResponsiveContainer width='100%' height={'100%'}>
          <ComposedChart data={generateData(data?.data, isShowAll)}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              tick={{ fill: stroke }}
              dataKey='title'
              angle={-40}
              textAnchor='end'
              interval={0}
              height={100}
              tickFormatter={(value) => (value.length > 10 ? value.slice(0, 10) + '...' : value)}
            />
            <YAxis tick={{ fill: stroke }} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: stroke, opacity: 0.1 }}
              contentStyle={{ color: '#000' }}
            />
            {/* <Legend visibility={'hidden'} /> */}
            <CartesianGrid stroke='#f5f5f5' />
            {/* <Area type='monotone' dataKey='plan' fill='#41bbfa' stroke='#8884d8' hide />
          <Area type='monotone' dataKey='fact' fill='#9747ff' stroke='#8884d8' hide /> */}
            <Bar
              onClick={handleClick}
              dataKey='plan'
              barSize={20}
              name={t('Reja')}
              fill='#41bbfa'
            />
            <Bar
              onClick={handleClick}
              dataKey='fact'
              barSize={20}
              name={t('Fakt')}
              fill='#9747ff'
            />
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
      <div style={{ backgroundColor: '#fff', color: '#000', padding: '10px', borderRadius: '5px' }}>
        <div>{payload[0]?.payload?.title}</div>
        {payload?.slice(0, 2).map((entry, index) => {
          return (
            <div key={index} style={{ color: entry.fill }}>
              {entry.name}: {formatNum(entry.value)}
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};
