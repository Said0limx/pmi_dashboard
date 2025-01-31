import { keepPreviousData } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { useFetch } from '../hooks';
import { useAuthStore } from '../store/use-auth-store';
import { useFilterStore } from '../store/use-filter-store';
import {
  useDynamicsParams,
  useStatisticsParams,
  useValidateDynamicParams,
} from './api-hooks-params';

export const useReportRegionStatistics = ({
  onSuccess,
  extraBody = {},
  queryOptions = {},
} = {}) => {
  const params = useStatisticsParams();
  const { authority_ids } = useFilterStore();
  return useFetch({
    url: '/region-report/statistics',
    key: 'region-report/statistics',
    method: 'POST',
    body: {
      authority_id: authority_ids.at(-1),
      ...params,
      ...extraBody,
    },
    dataKey: null,
    onSuccess,
    queryOptions: {
      placeholderData: keepPreviousData,
      ...queryOptions,
    },
  });
};

export const useReportRegionDynamics = ({ onSuccess, extraBody = {}, queryOptions = {} } = {}) => {
  const params = useDynamicsParams();
  const enabled = useValidateDynamicParams();
  const { authority_ids } = useFilterStore();

  return useFetch({
    url: '/region-report/dynamics',
    key: 'region-report/dynamics',
    method: 'POST',
    body: {
      authority_id: authority_ids.at(-1),
      ...params,
      ...extraBody,
    },
    dataKey: null,
    onSuccess,
    queryOptions: {
      ...queryOptions,
      enabled,
    },
  });
};

export const useClassificationsStatistics = ({
  onSuccess,
  extraBody = {},
  queryOptions = {},
} = {}) => {
  const { authority_ids } = useFilterStore();
  const params = useStatisticsParams();
  return useFetch({
    url: '/report-classification/statistics',
    key: 'report-classification/statistics',
    method: 'POST',
    body: {
      authority_id: authority_ids.at(-1),
      ...params,
      ...extraBody,
    },
    dataKey: null,
    onSuccess,
    queryOptions,
  });
};

export const useClassificationsDynamics = ({
  onSuccess,
  extraBody = {},
  queryOptions = {},
} = {}) => {
  const params = useDynamicsParams();
  const { authority_ids } = useFilterStore();
  return useFetch({
    url: '/report-classification/dynamics',
    key: 'report-classification/dynamics',
    method: 'POST',
    body: {
      authority_id: authority_ids.at(-1),
      ...params,
      ...extraBody,
    },
    dataKey: null,
    onSuccess,
    queryOptions,
  });
};

export const useAuthorityDynamics = ({ onSuccess, extraBody = {}, queryOptions = {} } = {}) => {
  const params = useDynamicsParams();
  const { authority_ids } = useFilterStore();

  return useFetch({
    url: '/authority-report/dynamics',
    key: 'authority-report/dynamics',
    method: 'POST',
    body: {
      authority_id: authority_ids.at(-1),
      ...params,
      ...extraBody,
    },
    dataKey: null,
    onSuccess,
    queryOptions,
  });
};

export const useAuthorityStatistics = ({ onSuccess, extraBody = {}, queryOptions = {} } = {}) => {
  const params = useStatisticsParams();
  const { authority_ids } = useFilterStore();
  return useFetch({
    url: '/authority-report/statistics',
    key: 'authority-report/statistics',
    method: 'POST',
    body: {
      authority_id: authority_ids.at(-1),
      ...params,
      ...extraBody,
    },
    dataKey: null,
    onSuccess,
    queryOptions,
  });
};

export const useSourcesDynamics = ({ onSuccess, extraBody = {}, queryOptions = {} } = {}) => {
  const params = useDynamicsParams();

  return useFetch({
    url: '/source-report/dynamics',
    key: 'source-report/dynamics',
    method: 'POST',
    body: {
      ...params,
      ...extraBody,
      report_category_id: 4,
    },
    dataKey: null,
    onSuccess,
    queryOptions,
  });
};

export const useSourcesStatistics = ({ onSuccess, extraBody = {}, queryOptions = {} } = {}) => {
  const params = useStatisticsParams();
  const { source_id } = useFilterStore();
  return useFetch({
    url: '/source-report/statistics',
    key: 'source-report/statistics',
    method: 'POST',
    body: {
      ...params,
      ...extraBody,
      source_id,
      report_category_id: 4,
    },
    dataKey: null,
    onSuccess,
    queryOptions,
  });
};

//
export const useColorsList = ({ params, queryOptions } = { params: {}, queryOptions: {} }) => {
  return useFetch({
    key: 'color/list',
    url: '/color/list',
    params,
    queryOptions,
  });
};

export const useColorTypesList = () => {
  return useFetch({
    key: 'color-type/list',
    url: '/color-type/list',
  });
};

export const useColorfieldsList = () => {
  return useFetch({
    key: '/color-field/list',
    url: '/color-field/list',
  });
};

export const useExecutor = ({ onSuccess, queryOptions = {} } = {}) => {
  return useFetch({
    url: '/admin/strategy-executor/list',
    key: 'admin/strategy-executor/list',
    method: 'POST',
    body: {},
    dataKey: null,
    onSuccess,
    queryOptions,
  });
};

export const useScaleColor = ({ key }) => {
  return useFetch({
    key: `admin/scales-color/find?scale_table=${key}`,
    url: `/admin/scales-color/find?scale_table=${key}`,
    method: 'get',
  });
};

export const useScalesNumberCategoryList = ({ queryOptions = {} } = {}) => {
  return useFetch({
    key: 'admin/scales-number-category/list',
    url: '/admin/scales-number-category/list',
    method: 'get',
    queryOptions: { ...queryOptions },
  });
};

export const useScalesSettingsList = () => {
  return useFetch({
    key: 'admin/scales-setting/list',
    url: '/admin/scales-setting/list',
    method: 'get',
  });
};

export const useScalesTableList = () => {
  return useFetch({
    key: 'admin/scales-table/list',
    url: '/admin/scales-table/list',
    method: 'get',
  });
};

export const useScalesTableView = () => {
  const { table_id } = useParams();
  return useFetch({
    key: `admin/scales-table/${table_id}/view`,
    url: `/admin/scales-table/${table_id}/view`,
    dataKey: null,
    queryOptions: {
      staleTime: 0,
    },
  });
};

// userDetails

export const useUserDetails = () => {
  const { setUserDetails } = useAuthStore();
  useFetch({
    url: '/user/detail-list',
    key: '/user/detail-list',
    onSuccess: ({ data }) => {
      setUserDetails({ ...data, role: data.is_admin ? 'super_admin' : 'admin' });
    },
  });
};
