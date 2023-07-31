export const getTranslated = (eng: string, mng: string, locale?: string): string => {
  // FIXME: language loading
  let language
  try {
    language = localStorage.getItem('language') || null
  } catch (error) {}

  if (locale) language = locale

  if (language === null) return mng !== null ? mng : eng

  if (language === 'en') {
    return eng !== null ? eng : mng
  } else {
    return mng !== null ? mng : eng
  }
}
