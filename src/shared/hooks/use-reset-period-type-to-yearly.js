import { useEffect } from 'react';

import { useFilterStore } from '../store/use-filter-store';

const useResetPeriodTypeToYearly = () => {
  const {
    resetPeriodTypeIdToYearly,
    reportViewFields: { report_graphic_view_id },
    periodFields: { period_type_id },
    setPeriodField,
  } = useFilterStore();

  useEffect(() => {
    if ((report_graphic_view_id === 2 || report_graphic_view_id === 3) && period_type_id === 6) {
      setPeriodField('period_type_id', 2);
    }
    return () => {
      resetPeriodTypeIdToYearly();
    };
  }, [report_graphic_view_id, resetPeriodTypeIdToYearly, setPeriodField]);
};

export default useResetPeriodTypeToYearly;
