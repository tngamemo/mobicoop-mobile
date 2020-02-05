const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  outputDir: './www',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  configureWebpack: {
    plugins: [
      new CopyPlugin([
        { from: 'instanceAssets/' + process.env.VUE_APP_NAME.toLowerCase(), to: 'assets', force: true},
      ]),
    ]
  }
}
