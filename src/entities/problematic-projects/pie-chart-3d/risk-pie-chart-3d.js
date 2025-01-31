'use client';
import { useComputedColorScheme } from '@mantine/core';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsReact from 'highcharts-react-official';

import { Loader } from '@/shared/ui';

const lightTheme = {
  legend: {
    enabled: true, // Enable legend
    layout: 'horizontal',
    align: 'center', // O'ngga joylash
    verticalAlign: 'bottom',
    maxHeight: 100,
    itemStyle: {
      color: 'black',
    },
    itemHoverStyle: {
      color: '#00000075', // Hover holatidagi matn rangi
    },
    labelFormatter: function () {
      // legend nomi oldiga problem_project_count qiymatini qo'shish
      const index = this.index; // Bu yerda [2] - problem_project_count
      const dataItem = this.series.data[index];
      if (dataItem) {
        // Problem project count-ni olish va legendda ko'rsatish
        return `${this.name} ${dataItem[2] ? `(${dataItem[2]})` : ''}`; // dataItem[2] = problem_project_count
        // dataItem[2] = problem_project_count
      } else {
        return this.name; // Agar dataItem topilmasa, faqat nomni qaytarish
      }
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      depth: 60,
      showInLegend: true,
      dataLabels: {
        enabled: true,
        format: '{point.name}: {point.y}%',
        style: {
          color: 'black',
          fontWeight: 'medium',
          textOutline: 'none',
          fontSize: '14px',
        },
        // distance: -30,
      },
    },
  },
};

const darkTheme = {
  legend: {
    enabled: true, // Enable legend
    layout: 'horizontal',
    align: 'center', // O'ngga joylash
    verticalAlign: 'bottom',
    maxHeight: 100,
    itemStyle: {
      color: 'white',
    },
    itemHoverStyle: {
      color: '#ffffff75', // Hover holatidagi matn rangi
    },
    labelFormatter: function () {
      // legend nomi oldiga problem_project_count qiymatini qo'shish
      const index = this.index; // Bu yerda [2] - problem_project_count
      const dataItem = this.series.data[index];
      if (dataItem) {
        // Problem project count-ni olish va legendda ko'rsatish
        return `${this.name} ${dataItem[2] ? `(${dataItem[2]})` : ''}`; // dataItem[2] = problem_project_count
      } else {
        return this.name; // Agar dataItem topilmasa, faqat nomni qaytarish
      }
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      depth: 60,
      showInLegend: true,

      dataLabels: {
        enabled: true,
        format: '{point.name}: {point.y}%',
        style: {
          color: 'white',
          fontWeight: 'medium',
          textOutline: 'none',
          fontSize: '14px',
        },
        // distance: -30,
      },
    },
  },
};

export default function RiskPieChart({ title, data, loading, name = '' }) {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const options = {
    ...(computedColorScheme === 'dark' ? darkTheme : lightTheme),
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      with: '100%',
      // styledMode: true,
      backgroundColor: 'transparent',
    },
    credits: {
      enabled: false, // This removes the "Highcharts.com" text
    },
    title: {
      text: '',
    },
    series: [
      {
        name: name,
        data: data.map((item) => [
          item.title,
          item.percent_problem_project ? Number(item.percent_problem_project) : 0,
          item.problem_project_count ? Number(item.problem_project_count) : 0,
        ]),
      },
    ],
    tooltip: {
      pointFormatter: function () {
        return `(${this.percentage.toFixed(2)}%)`;
      },
    },
  };

  return (
    <div className='flex flex-col items-center min-h-52 p-5 after:rounded-[1.25rem] rounded-[1.25rem] relative after:absolute after:inset-0 after:bg-content_box_bg dark:after:bg-main_blue_5 after:-z-10 shadow-[2px_3px_7.9px_1px_#0000000A]'>
      <div className='mb-3 w-full text-left tracking-tighter text-2xl leading-8 text-color font-bold'>
        {title}
      </div>

      {loading ? (
        <Loader />
      ) : (
        Boolean(data.length) && <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
}
