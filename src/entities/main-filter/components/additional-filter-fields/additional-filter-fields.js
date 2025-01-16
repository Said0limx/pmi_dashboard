import { useTranslations } from 'next-intl';

import { useFilterStore } from '@/shared/store/use-filter-store';
import { Title } from '@/shared/ui';

import ApplicationTypeMultiSelect from '../fields/application-type-multi-select';
import CitizenColorMultiSelect from '../fields/citizen-color-multi-select';
import EmploymentTypeMultiSelect from '../fields/employment-type-multi-select';
import ExpiredMultiSelect from '../fields/expired-multi-select';
import FormTypeMultiSelect from '../fields/form-type-multi-select';
import InvalidTypeMultiSelect from '../fields/invalid-type-multi-select';
import ProceduralMultiSelect from '../fields/procedural-multi-select';
import RecipientTypeMultiSelect from '../fields/recipient-type-multi-select';
import RepeatabilityTypeMultiSelect from '../fields/repeatability-multi-type-select';
import RequestLanguageMultiSelect from '../fields/request-language-multi-select';
import ResultTypeMultiSelect from '../fields/result-type-multi-select';

export const AdditionalFilterFields = () => {
  const t = useTranslations();
  const {
    reportViewFields: { report_graphic_view_id },
  } = useFilterStore();

  if (report_graphic_view_id === 3) return null;

  return (
    <>
      <Title size='md'>{t("Qo'shimcha ustun filtrlar")}</Title>
      <ResultTypeMultiSelect />
      <ApplicationTypeMultiSelect />
      <RepeatabilityTypeMultiSelect />
      <CitizenColorMultiSelect />
      <ExpiredMultiSelect />
      <EmploymentTypeMultiSelect />
      <FormTypeMultiSelect />
      <InvalidTypeMultiSelect />
      <ProceduralMultiSelect />
      {/* <RequestLanguageMultiSelect /> */}
      <RecipientTypeMultiSelect />
    </>
  );
};
