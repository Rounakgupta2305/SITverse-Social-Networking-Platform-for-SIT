import Homepage from "./pages/Homepage"
import Loginpage from "./pages/Loginpage"
import Profiepage from "./pages/Profiepage"
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom"
import { useMemo } from "react"
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
  <div>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<Loginpage/>}/>
          <Route path="/home" element={isAuth? <Homepage/> : <Navigate to="/"/>} />
          <Route path="/profile/:userId" element={isAuth ? <Profiepage/> : <Navigate to="/"/> }/>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
  )
}

export default App
