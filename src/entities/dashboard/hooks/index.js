'use client';
import { keepPreviousData } from '@tanstack/react-query';

import { useFetch } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';

const useMakeBody = () => {
  const { checkboxFields, periodFields, areaFields } = useFilterStore();

  const enabled = Object.keys(checkboxFields).length === 8;

  return {
    body: {
      period_id: periodFields.period_id || null,
      region_id: areaFields.region_id || null,
      period_type_id: periodFields.period_type_id || null,
      period_year_id: periodFields.period_year_id || null,
      period_month_id: periodFields.period_month_id || null,
      period_day_id: periodFields.period_day_id || null,
      ...checkboxFields,
    },
    enabled,
  };
};

export const useTasksAmount = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/dashboard/tasks-amount',
    method: 'POST',
    dataKey: null,
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useTasksEmploymentType = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/dashboard/tasks-employment-type',
    method: 'POST',
    dataKey: null,
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useTasksResultType = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/dashboard/tasks-result-type',
    method: 'POST',
    dataKey: null,
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useTasksByCitizenAge = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: 'dashboard/tasks-by-citizen-age',
    method: 'POST',
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useTasksBySource = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/dashboard/tasks-by-source',
    method: 'POST',
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useTasksByRegionMap = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/dashboard/tasks-by-region-map',
    method: 'POST',
    dataKey: null,
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};

export const useClassificationsList = ({ onSuccess, extraBody = {}, queryOptions = {} } = {}) => {
  const { body, enabled } = useMakeBody();

  const fetchInfo = useFetch({
    url: '/classification/list',
    key: '/classification/list',
    method: 'POST',
    body: {
      ...body,
      ...extraBody,
    },
    dataKey: null,
    onSuccess,
    queryOptions: {
      enabled,
      ...queryOptions,
    },
  });

  if (fetchInfo.data) {
    return {
      ...fetchInfo,
      data: {
        ...fetchInfo.data,
        totalAmount: fetchInfo.data.data.reduce((acc, el) => acc + el.amount, 0),
      },
    };
  }
  return fetchInfo;
};
