import React from 'react'
import { AppProps } from 'next/app'
import 'normalize.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimum-scale=1, viewport-fit=cover"
      />
      <Component {...pageProps} />
    </>
  )
}

export default App
