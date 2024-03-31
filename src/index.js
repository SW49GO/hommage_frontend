import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider} from 'react-query'
import { store, persistor } from './features/store'
import { Provider } from 'react-redux'
import Router from './components/Router'
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

const queryClient = new QueryClient()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <Router/>
        </React.StrictMode>
      </PersistGate>
    </Provider>
</QueryClientProvider>
)