import Vue from 'vue'
import VueI18n from 'vue-i18n'
import _ from 'lodash'

Vue.use(VueI18n)

function loadMessages (locales) {
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

function loadLocaleMessages() {
  const locales = require.context('./assets/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  let localeMessages = loadMessages(locales)

  let appModule = JSON.parse(process.env.VUE_APP_MODULE);
  // Merge locales if Solidarity Transport module enabled
  if (appModule.SOLIDARYTRANSPORT == "true") {
    const solidaryTransportLocales = require.context(`./${process.env.VUE_APP_SOLIDARY_ROUTENAME}/assets/locales`, true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const solidaryTransportLocaleMessages = loadMessages(solidaryTransportLocales)

    localeMessages = _.merge(localeMessages, solidaryTransportLocaleMessages)
  }

  return localeMessages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'fr',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'fr',
  messages: loadLocaleMessages()
})
