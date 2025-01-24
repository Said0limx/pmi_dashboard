'use client';
import { useComputedColorScheme } from '@mantine/core';
import { BarElement, CategoryScale, Chart, Legend, LinearScale } from 'chart.js';
import { useRef } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';

import { useFilterStore } from '@/shared/store/use-filter-store';

import { useAdjustData } from '../hooks/use-adjust-data';

Chart.register([Legend, CategoryScale, LinearScale, BarElement]);

const SectionRegionBarChart = ({ data = [] }) => {
  const { setAreaField, areaFields } = useFilterStore();

  const colorScheme = useComputedColorScheme();
  const color = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const { backgroundColors, datasets, labels } = useAdjustData(data);
  const chartRef = useRef();

  const handeClick = (event) => {
    if (getElementAtEvent(chartRef.current, event).length > 0) {
      const dataPoint = getElementAtEvent(chartRef.current, event)[0].index;
      if (!areaFields.region_id && data[dataPoint].id !== 9999) {
        setAreaField('region_id', data[dataPoint].id);
      }
    }
  };

  return (
    <Bar
      height={90}
      data={{
        labels: labels,
        datasets: [
          {
            data: datasets,
            backgroundColor: backgroundColors,
            borderRadius: 30,
            minBarLength: 10,
          },
        ],
      }}
      ref={chartRef}
      options={{
        animation: true,
        normalized: true,
        scales: {
          x: {
            ticks: { font: { size: 8 }, color: color },
          },
          y: {
            ticks: { font: { size: 12 }, color: color },
          },
        },
        plugins: {
          datalabels: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
      }}
      onClick={handeClick}
    />
  );
};

export default SectionRegionBarChart;
