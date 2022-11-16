import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';
import BottomToTop from '@/components/BottomToTop';
function MyApp({ Component, pageProps }) {
  return <>
    <NextNProgress />
    <Component {...pageProps} />
    <BottomToTop/>
  </>
}

export default MyApp
