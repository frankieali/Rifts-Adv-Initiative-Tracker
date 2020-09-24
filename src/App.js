import React from 'react'
import logo from './logo.svg'
import './App.css'
import { CssBaseline } from '@material-ui/core'

import { AppProvider } from './context/App.context'
import Tracker from './components/Tracker'

function App() {
  return (
    <div className="App">
      <AppProvider>
        <CssBaseline />
        <Tracker />
      </AppProvider>
    </div>
  );
}

export default App;
