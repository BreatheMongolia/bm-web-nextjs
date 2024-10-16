const { i18n } = require('./next-i18next.config')

if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `)
}

/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about/info',
        permanent: true,
      },
      {
        source: '/about/ourstory',
        destination: '/about/our-story',
        permanent: true,
      },
      {
        source: '/about/ourteam',
        destination: '/about/our-team',
        permanent: true,
      },
      {
        source: '/about/supportus',
        destination: '/about/support-us',
        permanent: true,
      },
      {
        source: '/take-actions',
        destination: '/take-action',
        permanent: true,
      },
    ]
  },
  i18n,
  images: {
    domains: [
      process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0], // Valid WP Image domain.
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
      'secure.gravatar.com',
    ],
  },
}
