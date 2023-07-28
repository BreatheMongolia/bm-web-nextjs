import { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '../components/layout/layout'
import 'styles/index.scss'
import 'styles/map-styles.scss'
import 'styles/news-styles.scss'
import 'styles/takeAction-styles.scss'
import 'mapbox-gl/dist/mapbox-gl.css'
import Script from 'next/script'
import { AnimatePresence } from 'framer-motion'
import { createContext } from 'react'
import { MapContextInterface } from 'lib/air-pollution-map/types'
import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'

export const MapContext = createContext<MapContextInterface | null>(null)

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

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
        </Head>
        <NextNProgress height={7} color="rgba(0,0,0,0.5)" showOnShallow={true} />
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </AnimatePresence>
  )
}

export default appWithTranslation(MyApp)
