'use client';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsReact from 'highcharts-react-official';

const options = {
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
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      depth: 50,
      dataLabels: {
        enabled: true,
        format: '{point.name}: {point.y}',
        style: {
          color: 'white',
          fontWeight: 'bold',
          textOutline: 'none',
          fontSize: '16px',
        },
        // distance: -30,
      },
    },
  },
  series: [
    {
      name: 'Share',
      data: [
        ['Apple', 30],
        ['Banana', 20],
        ['Orange', 25],
        ['Grapes', 15],
        ['Others', 10],
      ],
    },
  ],
};

export default function TotalInvestments() {
  return (
    <div className='p-5 after:rounded-[1.25rem] rounded-[1.25rem] relative after:absolute after:inset-0 after:bg-content_box_bg dark:after:bg-main_blue_5 after:-z-10 shadow-[2px_3px_7.9px_1px_#0000000A]'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
