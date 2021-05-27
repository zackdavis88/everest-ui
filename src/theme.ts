import {createMuiTheme} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

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
    }
  }
});

export default theme;
