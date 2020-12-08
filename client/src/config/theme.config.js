import { createMuiTheme } from '@material-ui/core/styles';


//Config style
export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f57c00',
      main: '#ef6c00',
      dark: '#e65100',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff5722',
      main: '#d84315',
      dark: '#bf360c',
      contrastText: '#fff',
    },
  },
});