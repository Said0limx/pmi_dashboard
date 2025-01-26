'use client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useFilterStore = create(
  persist(
    (set) => ({
      // States
      checkboxFields: {},
      periodFields: {},
      source_id: null,
      order_id: null,
      abroad_country_id: null,
      sphere_id: null,
      industry_id: null,
      authority_id: null,
      authority_ids: [],
      reportViewFields: {
        report_view_id: 1,
        report_type_id: 2,
        report_category_id: 1,
        report_graphic_view_id: 1,
      },
      classificationFields: {
        classifier_type_id: 1,
        classification_id: null,
        category_id: null,
        problem_id: null,
        is_dashboard_classification: false,
      },
      areaFields: {
        region_id: null,
        district_id: null,
        territory_type_id: 1,
        authority_territoriality_type_id: 1,
      },
      columnFields: {
        result_type_ids: [],
        expired_ids: [],
        citizen_color_ids: [],
        app_type_ids: [],
        invalid_type_ids: [],
        request_language_ids: [],
        form_type_ids: [],
        repeatability_type_ids: [],
        procedural_ids: [],
        employment_type_ids: [],
        recipient_type_ids: [],
      },

      // Actions
      setField: (fieldKey, fieldValue) =>
        set((state) => {
          return { ...state, [fieldKey]: fieldValue };
        }),
      setAuthorityField: (fieldValue) =>
        set((state) => {
          return { ...state, authority_ids: [...state.authority_ids, fieldValue] };
        }),
      resetToInitialValues: () =>
        set((state) => ({
          ...state,
          source_id: null,
          order_id: null,
          abroad_country_id: null,
          sphere_id: null,
          industry_id: null,
          authority_id: null,
          // complex_ids: [],
        })),
      removeAuthorityField: () =>
        set((state) => {
          const authority_ids = state.authority_ids.filter(
            (id) => id !== state.authority_ids.at(-1),
          );
          return { ...state, authority_ids };
        }),
      clearAuthorityField: () =>
        set((state) => {
          return { ...state, authority_ids: [] };
        }),
      removeAuthorityFieldsUntilAuthorityId: (authorityId) =>
        set((state) => {
          const index = state.authority_ids.indexOf(authorityId);
          const authority_ids = state.authority_ids.filter((id, i) => i <= index);
          return { ...state, authority_ids };
        }),
      setCheckboxField: ({ fieldKey, fieldValue }) =>
        set((state) => {
          return { checkboxFields: { ...state.checkboxFields, [fieldKey]: fieldValue } };
        }),
      setPeriodField: (fieldKey, fieldValue) =>
        set((state) => {
          return { periodFields: { ...state.periodFields, [fieldKey]: fieldValue } };
        }),
      resetPeriodTypeIdToYearly: () =>
        set((state) => {
          if (state.periodFields.period_type_id === 1)
            return { periodFields: { ...state.periodFields, period_type_id: 2 } };
          return state;
        }),
      setReportViewField: (fieldKey, fieldValue) =>
        set((state) => {
          return { reportViewFields: { ...state.reportViewFields, [fieldKey]: fieldValue } };
        }),
      setClassificationField: (fieldKey, fieldValue) =>
        set((state) => {
          return {
            classificationFields: { ...state.classificationFields, [fieldKey]: fieldValue },
          };
        }),
      setAreaField: (fieldKey, fieldValue) =>
        set((state) => {
          return {
            areaFields: { ...state.areaFields, [fieldKey]: fieldValue },
          };
        }),
      setColumnField: (fieldKey, fieldValue) =>
        set((state) => {
          return {
            columnFields: { ...state.columnFields, [fieldKey]: fieldValue },
          };
        }),
    }),
    {
      name: 'filter-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
