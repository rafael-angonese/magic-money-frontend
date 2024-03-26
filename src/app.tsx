import React from 'react'

import { CssVarsProvider, extendTheme } from '@mui/joy'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/query-client'
import AppRouter from '@/routes/app-router'

import './index.css'

const theme = extendTheme({ cssVarPrefix: 'demo' })

const App: React.FC = () => {
  return (
    <>
      <CssVarsProvider
        defaultMode="dark"
        // the props below are specific to this demo,
        // you might not need them in your app.
        //
        theme={theme}
        // the selector to apply CSS theme variables stylesheet.
        colorSchemeSelector="#demo_dark-mode-by-default"
        //
        // the local storage key to use
        modeStorageKey="demo_dark-mode-by-default"
        //
        // set as root provider
        disableNestedContext
      >
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </CssVarsProvider>
    </>
  )
}

export default App
