import { useFilterStore } from '../store/use-filter-store';

const useBaseParams = () => {
  const { areaFields, reportViewFields, classificationFields, checkboxFields, columnFields } =
    useFilterStore();
  const baseParams = {
    // report view fields
    ...reportViewFields,
    // classification fields
    ...classificationFields,
    // checkbox fields
    ...checkboxFields,
    // area fields
    ...areaFields,
    // column fields
    column_filters: {
      ...columnFields,
    },
  };

  return { ...baseParams };
};

export const useDynamicsParams = () => {
  const { periodFields } = useFilterStore();
  const baseParams = useBaseParams();
  const params = {
    ...baseParams,
    // period fields
    period_type_id: periodFields.period_type_id,
    to_period_year_id: periodFields.period_year_id,
    to_period_month_id: periodFields.period_month_id,
    to_period_id: periodFields.period_id,
    to_period_day_id: periodFields.period_day_id,
    from_period_year_id: periodFields.from_period_year_id,
    from_period_month_id: periodFields.from_period_month_id,
    from_period_id: periodFields.from_period_id,
    from_period_day_id: periodFields.from_period_day_id,
  };

  return params;
};

export const useStatisticsParams = () => {
  const { periodFields } = useFilterStore();
  const baseParams = useBaseParams();
  const params = {
    ...baseParams,
    // period fields
    period_type_id: periodFields.period_type_id,
    period_year_id: periodFields.period_year_id,
    period_month_id: periodFields.period_month_id,
    period_id: periodFields.period_id,
    period_day_id: periodFields.period_day_id,
  };

  return params;
};

export const useValidateDynamicParams = () => {
  const { periodFields } = useFilterStore();
  const periodTypeId = periodFields.period_type_id;

  const fromPeriodYearId = periodFields.period_year_id;
  const toPeriodYearId = periodFields.from_period_year_id;

  const fromPeriodMonthId = periodFields.period_month_id;
  const toPeriodMonthId = periodFields.from_period_month_id;

  const fromPeriodDayId = periodFields.period_day_id;
  const toPeriodDayId = periodFields.from_period_day_id;

  const fromPeriodId = periodFields.period_id;
  const toPeriodId = periodFields.from_period_id;

  switch (periodTypeId) {
    case 1:
      return true;
    case 2:
      return !!fromPeriodYearId && !!toPeriodYearId;
    case 3:
    case 4:
      return !!fromPeriodYearId && !!toPeriodYearId && !!fromPeriodId && !!toPeriodId;
    case 5:
      return !!fromPeriodYearId && !!toPeriodYearId && !!fromPeriodMonthId && !!toPeriodMonthId;
    case 6:
      return (
        !!fromPeriodYearId &&
        !!toPeriodYearId &&
        !!fromPeriodMonthId &&
        !!toPeriodMonthId &&
        !!fromPeriodDayId &&
        !!toPeriodDayId
      );
    default:
      return false;
  }
};
