'use client';
import { useComputedColorScheme } from '@mantine/core';
import { BarElement, CategoryScale, Chart, Legend, LinearScale } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useRef } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';

import { useFilterStore } from '@/shared/store/use-filter-store';

import { useAdjustData } from '../hooks/use-adjust-data';

Chart.register([Legend, CategoryScale, LinearScale, BarElement, zoomPlugin]);

const SectionRegionBarChart = ({ data = [] }) => {
  const { setField } = useFilterStore();

  const colorScheme = useComputedColorScheme();
  const color = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const { backgroundColors, datasets, labels } = useAdjustData(data);
  const chartRef = useRef();

  const handeClick = (event) => {
    if (getElementAtEvent(chartRef.current, event).length > 0) {
      const dataPoint = getElementAtEvent(chartRef.current, event)[0].index;
      setField('authority_id', data[dataPoint].id);
    }
  };

  return (
    <Bar
      height={90}
      onClick={handeClick}
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
            ticks: {
              font: { size: 13 },
              color: color,
              callback: function (value) {
                const label = this.getLabelForValue(value);
                return label.length > 10 ? label.slice(0, 10) + '...' : label;
              },
              // callback: function (value, index, ticks) {
              //   const label = this.getLabelForValue(value);
              //   return label.split(' ').join('\n'); // Разбить по пробелам
              // },
            },
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

          // zoom: {
          //   pan: {
          //     enabled: true,
          //     mode: 'x',
          //   },
          //   zoom: {
          //     pinch: {
          //       enabled: true, // Enable pinch zooming
          //     },
          //     wheel: {
          //       enabled: true, // Enable wheel zooming
          //     },
          //     mode: 'x',
          //   },
          // },
        },
      }}
    />
  );
};

export default SectionRegionBarChart;
