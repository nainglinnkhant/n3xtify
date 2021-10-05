import { Provider } from 'react-redux'
import store from '../store'
import NextNProgress from 'nextjs-progressbar'
import OffcanvasStateProvider from '../context/OffcanvasStateContext'
import Navbar from '../components/UI/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
     return (
          <Provider store={store}>
               <OffcanvasStateProvider>
                    <NextNProgress 
                         color='#000000'
                         startPosition={0.3}
                         stopDelayMs={100}
                         height={3}
                         options={{ showSpinner: false }}
                    />
                    <Navbar />
                    <Component {...pageProps} />
               </OffcanvasStateProvider>
          </Provider>
     )
}

export default MyApp
