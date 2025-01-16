import { useSuspenseQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { answerStatusListQueryOptions } from '@/shared/query-options/answer-status-list';
import { Select } from '@/shared/ui';
import { enumsMapper } from '@/shared/utils/enums-mapper';

const AnswerStatusSelect = ({ setFieldValue, getInputProps }) => {
  const { data = [] } = useSuspenseQuery(answerStatusListQueryOptions());
  const t = useTranslations();
  return (
    <Select
      label={t('Javob turi')}
      placeholder={t('Javob turi')}
      name='answer_status_id'
      data={enumsMapper(data, { labelKey: 'title' })}
      setFieldValue={setFieldValue}
      getInputProps={getInputProps}
    />
  );
};

export default AnswerStatusSelect;
