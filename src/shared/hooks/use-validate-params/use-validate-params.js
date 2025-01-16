import { useFilterStore } from '@/shared/store/use-filter-store';

export const useValidateParams = () => {
  const { periodFields } = useFilterStore();
  switch (periodFields.period_type_id) {
    case 1: {
      return true;
    }
    case 2: {
      return !!(periodFields.period_type_id && periodFields.period_year_id);
    }
    case 3:
    case 4: {
      return !!(
        periodFields.period_type_id &&
        periodFields.period_id &&
        periodFields.period_year_id
      );
    }
    case 5: {
      return !!(
        periodFields.period_type_id &&
        periodFields.period_year_id &&
        periodFields.period_month_id
      );
    }
    case 6: {
      return !!(
        periodFields.period_type_id &&
        periodFields.period_year_id &&
        periodFields.period_month_id &&
        periodFields.period_day_id
      );
    }
    default:
      return false;
  }
};
