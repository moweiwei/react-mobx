import moment from 'moment-mini'
import LocaleProvider from 'components/LocaleProvider'
import cookie from 'utils/cookie'
import { lazy, getBrowserLang } from 'utils'

const { locale } = LocaleProvider

const SUPPOER_LANG = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: '简体中文',
    value: 'zh',
  },
]

const getLocales = {
  zh: lazy(() =>
    import(/* webpackChunkName: "locales-zh" */ `../locales/zh.json`)
  ),
  en: lazy(() =>
    import(/* webpackChunkName: "locales-en" */ `../locales/en.json`)
  ),
}

const init = async () => {
  const currentLang = getBrowserLang()
  if (currentLang && cookie('lang') !== currentLang) {
    cookie('lang', currentLang)
  }

  if (currentLang === 'zh') {
    moment.locale('zh', {
      relativeTime: {
        s: '1秒',
        ss: '%d秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年',
        past: '%s前',
        future: '在%s后',
      },
    })
  }

  const locales = {}

  await Promise.all(
    SUPPOER_LANG.map(async ({ value }) => {
      const modules = await getLocales[value]()
      locales[value] = modules.default
    })
  )

  return { locales, currentLang }
}

const t = (key, options) => {
  let value = key && locale.get(key, options)

  if (options && options.defaultValue && value === key) {
    value = options.defaultValue
  }

  return value
}

t.html = (key, options) => key && locale.getHTML(key, options)

export default {
  init,
  t,
}
