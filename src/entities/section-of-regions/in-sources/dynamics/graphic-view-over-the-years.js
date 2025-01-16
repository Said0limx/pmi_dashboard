import { BarElement, CategoryScale, Chart, Legend, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

import { useSetRegionOrDistrictId } from '@/shared/hooks';
import usePagination from '@/shared/hooks/use-pagination/use-pagination';
import { Pagination, Select } from '@/shared/ui';
import { colors } from '@/shared/variables/colors';

Chart.register(ChartDataLabels, CategoryScale, LinearScale, BarElement, Legend);
const GraphicViewOverTheYears = ({ data, headers, areaKey }) => {
  const { handleSet } = useSetRegionOrDistrictId();

  const {
    nextPage,
    pageCount,
    pageNumber,
    changePage,
    previousPage,
    pageLimit,
    start,
    end,
    setLimit,
  } = usePagination(headers.source, 2);
  const slicedSources = headers.source.slice(start, end);
  const slicedData = data.slice(start, end);
  const labels = useMemo(() => {
    const result = [];
    for (let i = 0; i < headers[areaKey].length * slicedSources.length; i++) {
      result.push(...Object.values(headers.sub_column_key));
    }
    return result;
  }, [areaKey, headers, slicedSources.length]);

  const datasets = useMemo(() => {
    const result = {};
    headers.main_column_key.forEach((key, mIndex) => {
      if (!result[mIndex]) {
        result[mIndex] = {
          label: key,
          data: [],
          backgroundColor: colors[mIndex],
          barThickness: 30,
          minBarLength: 50,
          borderWidth: 3,
          borderColor: colors[mIndex],
        };
      }
    });
    for (let i = 0; i < headers[areaKey].length; i++) {
      slicedData.forEach((item) => {
        item[i].forEach((innerItem, index) => {
          result[index].data.push(...Object.values(innerItem).map((item) => item || null));
        });
      });
    }

    return Object.values(result);
  }, [headers, areaKey, slicedData]);

  return (
    <div className='pb-6'>
      <div className='max-h-[600px] overflow-auto pt-8'>
        <div className='relative min-w-[1400px]'>
          <div
            className='flex flex-col justify-between border'
            style={{ height: labels.length * 32 }}
          >
            {headers[areaKey].map((item) => (
              <div className='h-full border-r flex  border-b last:border-b-0' key={item.id}>
                <div
                  className='flex items-center text-sm text-center cursor-pointer font-semibold justify-center border-r w-[240px] p-1'
                  onClick={() => handleSet(item.id)}
                >
                  {item[areaKey]}
                </div>
                <div className='flex flex-col justify-around w-full'>
                  {slicedSources.map((source) => {
                    return (
                      <div
                        key={source.id}
                        className=' h-full border-b last:border-b-0 text-sm text-center cursor-pointer font-semibold justify-between border-r w-full p-1'
                      >
                        <div className='w-[210px] flex items-center justify-center border-r h-full'>
                          {source.source}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div
            className='absolute -top-[32px] right-0 -bottom-[28px]'
            style={{ width: 'calc(100% - 450px)' }}
          >
            <Bar
              id='bar-chart'
              data={{
                labels: labels,
                datasets: datasets,
              }}
              options={{
                backgroundColor: '#F3F4F6',
                maintainAspectRatio: false,
                indexAxis: 'y',
                animation: true,
                normalized: true,
                scales: {
                  y: {
                    stacked: true,
                    border: {
                      color: '#fff',
                    },
                    grid: {
                      display: false,
                    },
                    suggestedMax: 100,
                    suggestedMin: 0,
                  },
                  x: {
                    stacked: true,
                    grid: {
                      display: false,
                    },
                    // max: 85000,
                    afterBuildTicks: function (scale) {
                      scale.max = scale.max * 1.15;
                      return scale;
                    },
                  },
                },
                plugins: {
                  customCanvasBackgroundColor: {
                    color: '#ffffff',
                  },
                  datalabels: {
                    color: '#ffffff',
                    font: {
                      weight: 'bold',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className='mt-5 flex gap-2'>
        <Select
          className='w-32'
          value={pageLimit.toString()}
          onChange={(value) => {
            setLimit(+value);
          }}
          data={[
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
            { value: '7', label: '7' },
            { value: '8', label: '8' },
          ]}
        />
        <Pagination
          pageCount={pageCount}
          changePage={changePage}
          previousPage={previousPage}
          nextPage={nextPage}
          pageNumber={pageNumber}
        />
      </div>
    </div>
  );
};

export default GraphicViewOverTheYears;
