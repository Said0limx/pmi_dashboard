import { useFilterStore } from '@/shared/store/use-filter-store';

export const useDetermineTimePeriod = () => {
  const { periodFields } = useFilterStore();
  return {
    isTimePeriod: periodFields.period_type_id !== 1,
    isOverTheYears: periodFields.period_type_id === 1,
  };
};
