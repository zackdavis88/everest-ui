import {createMuiTheme} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    primary: {
      light: blue["700"],
      main: blue["800"],
      dark: blue["900"]
    },
    secondary: {
      light: grey["300"],
      main: grey["400"],
      dark: grey["500"]
    },

  }
});

export default theme;
