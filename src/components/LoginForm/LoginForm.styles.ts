import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  container: {
    padding: "0 16px",
    borderRadius: "5px",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "transparent"
  },
  box: {
    padding: "0 25px",
    position: "relative"
  },
  heading: {
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: "5px 0",
    fontWeight: "bold"
  },
  subHeading: {
    color: theme.palette.text.primary,
    textAlign: "center"
  },
  form: {
    padding: "16px 0"
  },
  usernameField: {
    margin: "0"
  },
  passwordField: {
    margin: "12px 0"
  },
  button: {
    fontWeight: "bold"
  },
  formError: {
    margin: "12px 0 0 0",
    textAlign: "left",
    "& .MuiTypography-root": {
      padding: "12px 0",
      fontWeight: "bold",
    }
  }
}));
