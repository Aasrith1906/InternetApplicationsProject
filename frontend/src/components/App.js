import './App.css';
import { NavbarCommon } from './common/NavbarCommon'
import { LandingPage } from './LandingPage/LandingPage';
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Nav } from 'react-bootstrap';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: green[500],
    }
  },
});
function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
        <NavbarCommon />
    </ThemeProvider>
      
    </>
  );
}

export default App;
