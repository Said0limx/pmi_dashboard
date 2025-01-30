import { useTranslations } from 'next-intl';

import { useFilterStore } from '../store/use-filter-store';
import { YEARLY } from '../variables/period-type-types';

export const useFormatSum = () => {
  const t = useTranslations();
  const { periodFields } = useFilterStore();

  const formatSum = (
    item,
    yearAmountKey = 'year_amount',
    planAmountKey = 'plan_amount',
    factAmountKey = 'fact_amount',
    isNumberFact = false,
  ) => {
    let amount = 0;

    if (isNumberFact) {
      amount = item[factAmountKey];
    } else if (periodFields.period_type_id === YEARLY) {
      amount = item[yearAmountKey];
    } else {
      amount = item[planAmountKey];
    }

    amount = Number(amount);

    if (amount > 1000) {
      amount = `$${(amount / 1000).toFixed(2)} ${t('mlrd')}`;
    } else {
      amount = `$${amount.toFixed(2)} ${t('mln')}`;
    }

    return amount;
  };

  return { formatSum };
};

export const useFormatNum = () => {
  const t = useTranslations();

  const formatNum = (num) => {
    let amount = Number(num);

    if (amount > 1000) {
      amount = `$${(amount / 1000).toFixed(2)} ${t('mlrd')}`;
    } else {
      amount = `$${amount.toFixed(2)} ${t('mln')}`;
    }

    return amount;
  };

  return { formatNum };
};
