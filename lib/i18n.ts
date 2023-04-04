import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import mongolian from '../translations/mng.json'
import english from '../translations/en.json'
// import { getLanguage } from './utils/getLanguage'

i18n.use(initReactI18next).init({
  lng: 'mn',
  fallbackLng: 'mn',
  resources: {
    en: {
      translation: english,
    },
    mn: {
      translation: mongolian,
    },
  },
})

export default i18n
