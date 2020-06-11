/**

 Copyright (c) 2018, MOBICOOP. All rights reserved.
 This project is dual licensed under AGPL and proprietary licence.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU Affero General Public License for more details.
 You should have received a copy of the GNU Affero General Public License
 along with this program. If not, see <gnu.org/licenses>.

 Licence MOBICOOP described in the file
 LICENSE
 **************************/

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
    const solidaryTransportLocales = require.context(`./${process.env.VUE_APP_MODULE_SOLIDARYTRANSPORT_ROUTENAME}/assets/locales`, true, /[A-Za-z0-9-_,\s]+\.json$/i)
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
