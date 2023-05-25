import '../styles/globals.scss';
import { AppProps } from "next/app"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminProvider } from '@/contexts/AdminContext';

function MyApp({ Component,  pageProps }: AppProps){
  return (
        <AdminProvider>
          <Component {...pageProps}/>
          <ToastContainer autoClose={3000}/>
        </AdminProvider>
  )
}

export default MyApp
