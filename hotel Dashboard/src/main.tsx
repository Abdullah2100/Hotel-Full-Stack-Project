import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from 'react-hot-toast';

import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from 'react-auth-kit/createStore';

const queryClient = new QueryClient();

const store = createStore({
  authName: '_auth',
  authType: 'cookie',

  cookieDomain: window.location.hostname,
  cookieSecure:  false


});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider
      store={store}
    >
      <Toaster position='top-right' />
      <App />
    </AuthProvider>
  </QueryClientProvider>
)
