import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import vi from './locales/vi.json'
import en from './locales/en.json'

const languages = {
  vi: { translation: vi },
  en: { translation: en },
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: ['vi', 'en'],
    resources: languages,
    ns: ['translation'],
    defaultNS: 'translation',
    returnNull: false,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  })
  .then(() => {
    console.log('Init i18next DONE')
  })
  .catch((e) => {
    console.log('Init i18next FAILED', e)
  })

const I18n = i18next
export default I18n
