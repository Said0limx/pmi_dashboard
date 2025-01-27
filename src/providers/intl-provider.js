'use client';
import { IntlErrorCode, NextIntlClientProvider } from 'next-intl';
import { useEffect, useState } from 'react';

const IntlProvider = ({ children, locale }) => {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    import(`@/i18n/messages/${locale}.json`).then((res) => setMessages(res));
  }, [locale]);

  return (
    <NextIntlClientProvider
      messages={messages}
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
