import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="450299899297-rjc0rc2bmnni3ajp42pn3l3j4v34rbfm.apps.googleusercontent.com">
      <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={routes} />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
