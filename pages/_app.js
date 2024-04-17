import { Roboto } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
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
    </main>
  )
}