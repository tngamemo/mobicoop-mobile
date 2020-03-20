const CopyPlugin = require('copy-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');

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
      new CreateFileWebpack({path: './www', fileName: 'build.info', content: process.env.VUE_APP_NAME.toLowerCase()})
    ]
  }
}
