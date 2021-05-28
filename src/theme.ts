import {createMuiTheme} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

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
    error: {
      light: red["700"],
      main: red["800"],
      dark: red["900"]
    }
  }
});

export default theme;
