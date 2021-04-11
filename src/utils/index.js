export const lazy = ctor => () => ctor()

/**
 * parse string without error throw.
 * @param {string} json - json string need to be parsed
 * @param {object} defaultValue - if parse failed, return defaultValue
 */
export const safeParseJSON = (json, defaultValue) => {
  let result
  try {
    result = JSON.parse(json)
  } catch (e) {}

  if (!result && defaultValue !== undefined) {
    return defaultValue
  }
  return result
}

export const getBrowserLang = () => {
  const lang = (navigator.language || navigator.browserLanguage).toLowerCase()

  if (lang.indexOf('zh') !== -1) {
    return 'zh'
  }
  if (lang.indexOf('en') !== -1) {
    return 'en'
  }

  return 'zh'
}
