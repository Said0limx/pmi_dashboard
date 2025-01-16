import { useFetch } from '@/shared/hooks';
import { useFilterStore } from '@/shared/store/use-filter-store';

export const useReportTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'report-type/list',
    url: '/report-type/list',
    onSuccess,
    ...options,
  });
};
export const useReportViewsList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'report-view/list',
    url: '/report-view/list',
    onSuccess,
    ...options,
  });
};
export const useReportGraphicTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'report-graphic-view/list',
    url: '/report-graphic-view/list',
    onSuccess,
    ...options,
  });
};
export const useReportTypeCategoryList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'report-category/list',
    url: '/report-category/list',
    onSuccess,
    ...options,
  });
};
export const usePeriodTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'period-type/list',
    url: '/period-type/list',
    onSuccess,
    ...options,
  });
};

export const usePeriodsList = ({ options, onSuccess, params } = {}) => {
  const { periodFields } = useFilterStore();
  return useFetch({
    key: 'period/list',
    url: '/period/list',
    params: {
      period_type_id: params?.period_type_id || periodFields.period_type_id,
      period_year_id: params?.period_year_id || periodFields.period_year_id,
    },
    onSuccess,
    queryOptions: {
      ...options,
      enabled:
        (!!params?.period_type_id && !!params.period_year_id) ||
        (!!periodFields?.period_type_id && !!periodFields?.period_year_id),
    },
  });
};
export const usePeriodYearsList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'period-year/list',
    url: '/period-year/list',
    onSuccess,
    ...options,
  });
};
export const usePeriodMonthsList = ({ options, onSuccess, params } = {}) => {
  const { periodFields } = useFilterStore();
  return useFetch({
    key: 'period-month/list',
    url: '/period-month/list',
    params: {
      period_year_id: params?.period_year_id || periodFields?.period_year_id,
    },
    onSuccess,
    queryOptions: {
      enabled: !!periodFields?.period_year_id,
      ...options,
    },
  });
};
export const usePeriodDaysList = ({ options, onSuccess, params } = {}) => {
  const { periodFields } = useFilterStore();
  return useFetch({
    key: 'period-day/list',
    url: '/period-day/list',
    params: {
      month_id: periodFields?.period_month_id,
      year_id: periodFields?.period_year_id,
    },
    onSuccess,
    queryOptions: {
      enabled:
        !!(params?.period_month_id && !!params?.period_year_id) ||
        !!(periodFields.period_year_id && periodFields.period_month_id),
      ...options,
    },
  });
};
export const useClassifierTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'classifier-type/list',
    url: '/classifier-type/list',
    onSuccess,
    ...options,
  });
};
export const useResultTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'result-type/list',
    url: '/result-type/list',
    onSuccess,
    ...options,
  });
};
export const useApplicationTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'application-type/list',
    url: '/application-type/list',
    onSuccess,
    ...options,
  });
};
export const useRepeatabilityTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'repeatability-type/list',
    url: '/repeatability-type/list',
    onSuccess,
    ...options,
  });
};
export const useCitizenColorsList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'citizen-color/list',
    url: '/citizen-color/list',
    onSuccess,
    ...options,
  });
};
export const useExpiredList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'expired/list',
    url: '/expired/list',
    onSuccess,
    ...options,
  });
};
export const useSourceList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'source/list',
    url: '/source/list',
    onSuccess,
    ...options,
  });
};
export const useRegionsList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'soato/region-list',
    url: '/soato/region-list',
    onSuccess,
    ...options,
  });
};
export const useDistrictsList = ({ onSuccess } = {}) => {
  const { areaFields } = useFilterStore();
  return useFetch({
    key: 'soato/district-list',
    url: '/soato/district-list',
    onSuccess,
    params: { region_id: areaFields.region_id },
    queryOptions: {
      enabled: !!areaFields.region_id,
    },
  });
};

export const useMahallaList = ({ onSuccess } = {}) => {
  const { areaFields } = useFilterStore();
  return useFetch({
    key: 'mahalla/list',
    url: '/mahalla/list',
    onSuccess,
    params: { region_id: areaFields.region_id, district_id: areaFields.district_id },
    queryOptions: {
      enabled: !!areaFields.region_id && !!areaFields.district_id,
    },
  });
};

export const useGendersList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'gender/list',
    url: '/gender/list',
    onSuccess,
    ...options,
  });
};
export const useRecipientTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'recipient-type/list',
    url: '/recipient-type/list',
    onSuccess,
    ...options,
  });
};
export const useCollectiveList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'collective/list',
    url: '/collective/list',
    onSuccess,
    ...options,
  });
};
export const useEmploymentTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'employment-type/list',
    url: '/employment-type/list',
    onSuccess,
    ...options,
  });
};
export const useInvalidTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'invalid-type/list',
    url: '/invalid-type/list',
    onSuccess,
    ...options,
  });
};
export const useRequestLanguagesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'request-language/list',
    url: '/request-language/list',
    onSuccess,
    ...options,
  });
};
export const useRequestFormTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'request-form-type/list',
    url: '/request-form-type/list',
    onSuccess,
    ...options,
  });
};
export const useProceduralTasksList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'procedural-task/list',
    url: '/procedural-task/list',
    onSuccess,
    ...options,
  });
};
export const useTerritoryTypesList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'territory-type/list',
    url: '/territory-type/list',
    onSuccess,
    ...options,
  });
};
export const useAuthorityList = ({ options, onSuccess } = {}) => {
  const { authority_ids } = useFilterStore();

  return useFetch({
    key: 'authority/list',
    url: '/authority/list',
    onSuccess,
    params: { parent_id: authority_ids.at(-1) },
    ...options,
  });
};
export const useClassificationCategoryList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'classification/category-list',
    url: '/classification/category-list',
    onSuccess,
    ...options,
  });
};

export const useClassificationList = ({ options, onSuccess } = {}) => {
  const {
    classificationFields: { category_id, problem_id },
  } = useFilterStore();
  return useFetch({
    key: 'classification/classification-list',
    url: '/classification/classification-list',
    onSuccess,
    params: { category_id, problem_id },
    queryOptions: {
      enabled: !!category_id && !!problem_id,
    },
    ...options,
  });
};

export const useClassificationProblemList = ({ options, onSuccess } = {}) => {
  const {
    classificationFields: { category_id },
  } = useFilterStore();
  return useFetch({
    key: 'classification/problem-list',
    url: '/classification/problem-list',
    onSuccess,
    params: { category_id },
    queryOptions: {
      enabled: !!category_id,
    },
    ...options,
  });
};
export const useAuthorityTerritorialityList = ({ options, onSuccess } = {}) => {
  return useFetch({
    key: 'authority-territoriality-type/list',
    url: '/authority-territoriality-type/list',
    onSuccess,
    ...options,
  });
};
