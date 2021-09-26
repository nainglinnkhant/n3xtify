import { Provider } from 'react-redux'
import store from '../store'
import OffcanvasStateProvider from '../context/OffcanvasStateContext'
import Navbar from '../components/UI/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
     return (
          <Provider store={store}>
               <OffcanvasStateProvider>
                    <Navbar />
                    <Component {...pageProps} />
               </OffcanvasStateProvider>
          </Provider>
     )
}

export default MyApp
