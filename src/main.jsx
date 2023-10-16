import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
// import Routes from './routes/Routes'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <main className='dark text-foreground bg-background'>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </main>
  </NextUIProvider>
)
