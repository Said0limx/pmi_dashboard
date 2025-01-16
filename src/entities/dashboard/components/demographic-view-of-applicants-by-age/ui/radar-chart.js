import { useComputedColorScheme } from '@mantine/core';
import { Chart, Filler, LineElement, PointElement, RadialLinearScale } from 'chart.js';
import { Radar } from 'react-chartjs-2';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler);
export const RadarChart = ({ male, female }) => {
  const colorScheme = useComputedColorScheme();
  const color = colorScheme === 'dark' ? '#ffffff' : '#7A86A8';
  return (
    <Radar
      options={{
        elements: {
          line: {
            borderWidth: 3,
          },
        },

        scales: {
          r: {
            ticks: {
              backgroundColor: '#00000000',
              backdropColor: '#00000000',
              color,
            },
            pointLabels: {
              color,
            },
            angleLines: {
              color: color,
            },
            grid: {
              color: color,
            },
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
      data={{
        datasets: [
          {
            data: male?.data.map(({ amount }) => amount),
            label: 'Erkaklar',
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: color,
            pointHoverBackgroundColor: color,
            pointHoverBorderColor: 'rgb(54, 162, 235)',
          },
          {
            data: female?.data.map(({ amount }) => amount),
            label: 'Ayollar',
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: color,
            pointHoverBackgroundColor: color,
            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
        labels: ['0-18', '19-31', '31-45', '45-55', ' 55-60', ' 61-75', '76-100'],
      }}
    />
  );
};
