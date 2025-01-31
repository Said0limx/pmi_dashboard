'use client';
import { Button, Title } from '@mantine/core';
import { IconSquareArrowLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useTasksByRegionMap } from '@/entities/dashboard/hooks';
import { useFormatNum, useStrokeColor } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';
function generateData(data) {
  if (!data?.length) return [];

  const result = data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      plan: Number(item.plan_amount),
      fact: Number(item.fact_amount),
    };
  });

  return result;
}

export default function ByRegions() {
  const t = useTranslations();
  const { areaFields, setAreaField } = useFilterStore();
  const stroke = useStrokeColor();

  const { data = {}, isLoading } = useTasksByRegionMap();

  const handleClick = (el) => {
    if (el?.id) {
      setAreaField('region_id', el.id);
    } else {
      toast.error(t('ID mavjud emas'));
    }
  };

  return (
    <div className='p-5 pb-8 after:rounded-[1.25rem] rounded-[1.25rem] relative after:absolute after:inset-0 after:bg-content_box_bg dark:after:bg-main_blue_5 after:-z-10 shadow-[2px_3px_7.9px_1px_#0000000A]'>
      <div className='flex justify-between items-center pb-5'>
        <Title size='lg'>{t("Hududlar bo‘yicha o'zlashtirish")}</Title>{' '}
        {areaFields.region_id && (
          <Button
            leftSection={<IconSquareArrowLeft stroke={2} />}
            onClick={() => setAreaField('region_id', '')}
            variant='gradient'
          >
            {t('Ortga qaytish')}
          </Button>
        )}
      </div>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={generateData(data?.data)}>
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
            content={<CustomTooltip />}
            cursor={{ fill: stroke, opacity: 0.1 }}
            contentStyle={{ color: '#000' }}
          />
          <Bar onClick={handleClick} dataKey='plan' name={t('Reja')} fill='#41bbfa' />
          <Bar onClick={handleClick} dataKey='fact' name={t('Fakt')} fill='#9747ff' />
        </BarChart>
      </ResponsiveContainer>
    </div>
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
