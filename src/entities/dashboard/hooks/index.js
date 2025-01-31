'use client';
import { keepPreviousData } from '@tanstack/react-query';

import { useFetch } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';

const useMakeBody = () => {
  const {
    periodFields,
    areaFields,
    source_id,
    order_id,
    abroad_country_id,
    sphere_id,
    industry_id,
    authority_id,
    checkboxFields,
  } = useFilterStore();

  return {
    body: {
      source_id,
      order_id,
      abroad_country_id,
      sphere_id,
      industry_id,
      authority_id,

      period_id: periodFields.period_id || null,
      region_id: areaFields.region_id || null,
      period_type_id: periodFields.period_type_id || null,
      period_year_id: periodFields.period_year_id || null,
      period_month_id: periodFields.period_month_id || null,

      ...checkboxFields,
    },
  };
};

export const useTasksAmount = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/dashboard/stage-list',
    method: 'POST',
    dataKey: null,
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useAbroadCountryList = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/dashboard/abroad-country-list',
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
    url: '/dashboard/source-list',
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
    url: '/dashboard/sphere-list',
    method: 'POST',
    dataKey: null,

    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useTasksBySphere = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/sphere/bar-chart',
    method: 'POST',
    dataKey: null,

    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useTasksByMonth = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/sphere/master-by-month',
    method: 'POST',
    dataKey: null,

    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useTotalInvestment = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/sphere/pie-chart',
    method: 'POST',
    dataKey: null,

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
    url: '/dashboard/region-list',
    method: 'POST',
    dataKey: null,
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};

export const useDashboardAuthorityList = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/dashboard/authority-list',
    method: 'POST',
    dataKey: null,
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};

export const useLineChart = () => {
  const { body, enabled } = useMakeBody();
  return useFetch({
    url: '/dashboard/line-chart',
    method: 'POST',
    dataKey: null,
    body,
    queryOptions: {
      enabled,
      placeholderData: keepPreviousData,
    },
  });
};
export const useGetProjectList = () => {
  const { body } = useMakeBody();

  return useFetch({
    key: '/project/list',
    url: '/project/list',
    method: 'POST',
    body,
  });
};
export const useGetProjectProblemList = () => {
  const { body } = useMakeBody();

  return useFetch({
    key: '/project/problem-list',
    url: '/project/problem-list',
    method: 'POST',
    body,
  });
};

export const useGetProblemProjectStatuses = () => {
  const { body } = useMakeBody();

  return useFetch({
    key: '/project/problem-status-count',
    url: '/project/problem-status-count',
    method: 'POST',
    body,
  });
};

export const useGetProblemProjectRisksCount = () => {
  const { body } = useMakeBody();

  return useFetch({
    key: '/project/problem-risk-count',
    url: '/project/problem-risk-count',
    method: 'POST',
    body,
  });
};
export const useGetProblemProjectTypesCount = () => {
  const { body } = useMakeBody();

  return useFetch({
    key: '/project/problem-type-count',
    url: '/project/problem-type-count',
    method: 'POST',
    body,
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
