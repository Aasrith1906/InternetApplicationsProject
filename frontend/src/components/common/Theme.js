import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';


const palette = {
    mode: "dark",
    primary: {
        main: green[500],
    },
}
export const theme = createTheme({
    palette: palette
})