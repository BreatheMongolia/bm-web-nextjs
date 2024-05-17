import { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '../components/layout/layout'
import 'styles/index.scss'
import 'styles/map-styles.scss'
import 'styles/about-us.scss'
import 'styles/our-mission.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'styles/take-action.scss'
import 'styles/news-styles.scss'
import Script from 'next/script'
import { AnimatePresence } from 'framer-motion'
import { createContext, useEffect } from 'react'
import { MapContextInterface } from 'lib/air-pollution-map/types'
import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'

export const MapContext = createContext<MapContextInterface | null>(null)

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { locale } = useRouter()

  useEffect(() => {
    localStorage.setItem('language', locale)
  }, [locale])

  const title = pageProps.title ? pageProps.title : 'Breathe Mongolia Clean Air Coalition'
  const description = pageProps.description ? pageProps.description : 'Breathe Mongolia Clean Air Coalition'
  const image = pageProps.image ? pageProps.image : locale === 'en' ? '/images/og-en.jpg' : '/images/og-mn.jpg'

  // FIXME: Givebutter doesn't seem to be working
  return (
    <AnimatePresence mode="wait" initial={true}>
      <Layout>
        <Head>
          <Script src="https://js.givebutter.com/elements/latest.js" />
          <Script id="give-butter-config">
            {`window.Givebutter=window.Givebutter||function(){(Givebutter.q=Givebutter.q||[]).push(arguments)};Givebutter.l=+new Date;
          window.Givebutter('setOptions', {
              accountId: "cU8eUohIqzvZNZza",
              forceHttps: true,
              bubble: false
          });`}
          </Script>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="keywords" content="air pollution, clean air, public health, mongolia"></meta>

          <title>{title}</title>
          <meta property="og:description" content="&nbsp;" />
          <meta property="og:title" content={title} />
          <meta property="og:image" content={image} />
          <meta name="description" content={description} />
        </Head>
        <NextNProgress height={7} color="rgba(0,0,0,0.5)" showOnShallow={true} options={{ showSpinner: false }} />
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </AnimatePresence>
  )
}

export default appWithTranslation(MyApp)
