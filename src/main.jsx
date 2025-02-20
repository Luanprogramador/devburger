import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './routes'
import { Elements } from '@stripe/react-stripe-js';

import GlobalStyles from './styles/globalStyles';
import AppProvider from './hooks';
import stripePromise from './config/stripeConfig';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <Elements stripe={stripePromise} >
      <RouterProvider router = {router}/>
    </Elements>
    <GlobalStyles />
    <ToastContainer  autoClose={2000} theme='colored'/>
    </AppProvider>
  </React.StrictMode>
);