const path = require('path')

module.exports = {
  i18n: {
    locales: ['mn', 'en'],
    defaultLocale: 'mn',
  },
  localePath: path.resolve('./public/locales'),
}
