import { useTranslations } from 'next-intl';

import { Select } from '@/shared/ui';

const CatalogSelect = ({ setSelected, selected, onChange }) => {
  const t = useTranslations();
  const catalogs = [
    {
      label: t('Answer Status'),
      url: 'answer-status/edit',
      list: 'answer-status/list',
      value: '1',
    },
    {
      label: t('Application Type'),
      url: 'application-type/edit',
      list: 'application-type/list',
      value: '2',
    },
    {
      label: t('Authority Territoriality Type'),
      url: 'authority-territoriality-type/edit',
      list: 'authority-territoriality-type/list',
      value: '3',
    },
    {
      label: t('Classifier Type'),
      url: 'classifier-type/edit',
      list: 'classifier-type/list',
      value: '4',
    },
    { label: t('Collective'), url: 'collective/edit', list: 'collective/list', value: '5' },
    {
      label: t('Employment Type'),
      url: 'employment-type/edit',
      list: 'employment-type/list',
      value: '6',
    },
    { label: t('Expired'), url: 'expired/edit', list: 'expired/list', value: '7' },
    { label: t('Gender'), url: 'gender/edit', list: 'gender/list', value: '8' },
    { label: t('Invalid Type'), url: 'invalid-type/edit', list: 'invalid-type/list', value: '9' },
    { label: t('Period'), url: 'period/edit', list: 'period/list', value: '10' },
    { label: t('Period Month'), url: 'period-month/edit', list: 'period-month/list', value: '11' },
    { label: t('Period Type'), url: 'period-type/edit', list: 'period-type/list', value: '12' },
    {
      label: t('Procedural Task'),
      url: 'procedural-task/edit',
      list: 'procedural-task/list',
      value: '13',
    },
    {
      label: t('Recipient Type'),
      url: 'recipient-type/edit',
      list: 'recipient-type/list',
      value: '14',
    },
    {
      label: t('Repeatability Type'),
      url: 'repeatability-type/edit',
      list: 'repeatability-type/list',
      value: '15',
    },
    {
      label: t('Report Category'),
      url: 'report-category/edit',
      list: 'report-category/list',
      value: '16',
    },
    {
      label: t('Report Graphic View'),
      url: 'report-graphic-view/edit',
      list: 'report-graphic-view/list',
      value: '17',
    },
    { label: t('Report Type'), url: 'report-type/edit', list: 'report-type/list', value: '18' },
    { label: t('Report View'), url: 'report-view/edit', list: 'report-view/list', value: '19' },
    {
      label: t('Request Form Type'),
      url: 'request-form-type/edit',
      list: 'request-form-type/list',
      value: '20',
    },
    {
      label: t('Request Language'),
      url: 'request-language/edit',
      list: 'request-language/list',
      value: '21',
    },
    { label: t('Result Type'), url: 'result-type/edit', list: 'result-type/list', value: '22' },
    { label: t('Source'), url: 'source/edit', list: 'source/list', value: '23' },
    {
      label: t('Territory Type'),
      url: 'territory-type/edit',
      list: 'territory-type/list',
      value: '24',
    },
  ];

  return (
    <Select
      data={catalogs}
      value={selected?.value}
      label={t('Catalog')}
      placeholder={t('Choose catalog')}
      onChange={(value) => {
        setSelected(catalogs.find((item) => item.value === value));
        onChange?.(value);
      }}
    />
  );
};

export default CatalogSelect;
