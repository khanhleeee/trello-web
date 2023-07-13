import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline' 

import theme from './theme'
import Boards from './pages/Boards/_id'


function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline/>
      <Boards />
    </CssVarsProvider>
  )
}

export default App
