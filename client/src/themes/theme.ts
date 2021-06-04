import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const baseTheme = createMuiTheme({
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

const theme = responsiveFontSizes(baseTheme);

export { theme };
