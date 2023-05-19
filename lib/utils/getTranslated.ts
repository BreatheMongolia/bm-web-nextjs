export const getTranslated = (eng: string, mng: string): string => {
  // FIXME: language loading
  let language

  if (language === null) return mng !== null ? mng : eng

  if (language === 'en') {
    return eng !== null ? eng : mng
  } else {
    return mng !== null ? mng : eng
  }
}
