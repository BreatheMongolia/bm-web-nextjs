import { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '../components/layout/layout'
import '../styles/index.scss'
import Script from 'next/script'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  // FIXME: Givebutter doesn't seem to be working
  return (
    <AnimatePresence mode="wait" initial={false}>
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
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </AnimatePresence>
  )
}

export default MyApp
