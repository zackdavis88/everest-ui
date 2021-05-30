import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "25px",
    padding: "0",
    borderRadius: "10px"
  },
  box: {
    padding: "0 25px"
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
    margin: "12px 0 0 0"
  },
  confirmField: {
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
