import { getRequestConfig } from 'next-intl/server';
import { IntlErrorCode } from 'next-intl';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !['es', 'en', 'pt'].includes(locale)) {
    locale = 'es';
  }

  return {
    locale,
    messages: (
      await (locale === 'en'
        ? import('../messages/en.json')
        : locale === 'pt'
          ? import('../messages/pt.json')
          : import('../messages/es.json'))
    ).default,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.warn(`Missing message: ${error.message}`);
      } else {
        console.error(error);
      }
    },
    getMessageFallback({ key }) {
      return key;
    },
  };
});
