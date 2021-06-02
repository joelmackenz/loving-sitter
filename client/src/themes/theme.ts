import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

let theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#f04040' },
    text: { primary: '#000000' },
  },
  shape: {
    borderRadius: 5,
  },
});

theme = responsiveFontSizes(theme);

export { theme };
