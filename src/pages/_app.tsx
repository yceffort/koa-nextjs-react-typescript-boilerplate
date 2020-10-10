import React from 'react'
import { AppProps } from 'next/app'
import 'normalize.css'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
