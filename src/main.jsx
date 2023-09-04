import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes/Routes'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <Routes />
      </main>
    </NextUIProvider>
  </React.StrictMode>
)
