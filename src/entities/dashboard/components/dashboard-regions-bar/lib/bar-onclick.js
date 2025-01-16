import { getElementAtEvent } from 'react-chartjs-2';

export const onClick = (event, chartRef, data, setParam, getParam) => {
  if (getElementAtEvent(chartRef.current, event).length > 0) {
    const dataPoint = getElementAtEvent(chartRef.current, event)[0].index;
    if (!getParam.region_id && data[dataPoint].id !== 9999) {
      setParam('region_id', data[dataPoint].id);
    }
  }
};
