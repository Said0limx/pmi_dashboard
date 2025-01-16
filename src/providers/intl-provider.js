'use client';
import { IntlErrorCode, NextIntlClientProvider } from 'next-intl';

import { useFetch } from '@/shared/hooks';

const IntlProvider = ({ children, locale }) => {
  const { data = {} } = useFetch({
    url: `/admin/translate/fetch-all?lang=${locale}`,
    key: 'translations',
    dataKey: null,
  });

  return (
    <NextIntlClientProvider
      messages={data}
      locale={locale}
      onError={(error) => {
        if (error.code === IntlErrorCode.MISSING_MESSAGE) {
          //  asdhkj
        }
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlProvider;
