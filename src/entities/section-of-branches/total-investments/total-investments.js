'use client';
import { Switch, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsReact from 'highcharts-react-official';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useTotalInvestment } from '@/entities/dashboard/hooks';
import { useFormatNum, useStrokeColor } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';

function generateOptions(data, t, stroke, isShowByPLan, formatNum, handleClick) {
  return {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 50,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}',
          style: {
            color: stroke,
            fontWeight: 'bold',
            textOutline: 'none',
            fontSize: '14px',
          },
          // distance: -30,
        },
      },
    },
    series: [
      {
        name: isShowByPLan ? t('Reja') : t('Fakt'),
        data:
          data?.data?.map((item) => ({
            id: item.id,
            name: item.title,
            y: isShowByPLan ? Number(item.plan_amount || 0) : Number(item.fact_amount || 0),
          })) || [],
        point: {
          events: {
            click: function (e) {
              handleClick(this.options?.id);
            },
          },
        },
      },
    ],
  };
}

export default function TotalInvestments() {
  const { data } = useTotalInvestment();
  const t = useTranslations();
  const { formatNum } = useFormatNum();
  const stroke = useStrokeColor();
  const [isShowByPLan, setIsShowByPlan] = useState(false);
  const { setField, sphere_id, industry_id } = useFilterStore();

  const handleClick = (id) => {
    if (sphere_id) {
      setField('industry_id', id);
    } else {
      setField('sphere_id', id);
    }
  };

  const handleBack = () => {
    if (industry_id) {
      setField('industry_id', null);
    } else if (sphere_id) {
      setField('sphere_id', null);
    }
  };

  return (
    <div className='p-5 after:rounded-[1.25rem] rounded-[1.25rem] relative after:absolute after:inset-0 after:bg-content_box_bg dark:after:bg-main_blue_5 after:-z-10 shadow-[2px_3px_7.9px_1px_#0000000A]'>
      <div className='flex items-center justify-between'>
        <Title size='lg'>
          {t('Tarmoqlar bo‘yicha jami investitsiyalar')} -{' '}
          <span className='font-bold italic'>
            {isShowByPLan
              ? formatNum(data?.headers?.total_plan)
              : formatNum(data?.headers?.total_fact)}
          </span>
          , {t('shundan xorijiy investitsiyalar va kreditlar')} –
          <span className='font-bold italic'>
            {isShowByPLan
              ? formatNum(data?.headers?.total_source_plan)
              : formatNum(data?.headers?.total_source_fact)}
          </span>
          .
        </Title>
        <div className='flex items-center gap-3'>
          <Switch
            checked={isShowByPLan}
            onChange={(e) => setIsShowByPlan(e.target.checked)}
            label={t('Reja')}
            labelPosition='left'
          />
          {sphere_id && (
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
      <HighchartsReact
        highcharts={Highcharts}
        options={generateOptions(data, t, stroke, isShowByPLan, formatNum, handleClick)}
      />
    </div>
  );
}
