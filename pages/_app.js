import { Roboto } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import Head from 'next/head'
import '../styles/global.css';
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="G-C8KF9ESK3T" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
    </main>
  )
}