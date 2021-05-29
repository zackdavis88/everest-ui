import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: "25px 0 0 0"
  },
  box: {
    position: "relative",
    padding: "20px 55px 20px 25px",
  },
  info: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.info.main,
  },
  error: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
  },
  warning: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.warning.main
  },
  success: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
  },
  close: {
    color: "inherit",
    position: "absolute",
    right: "0",
    top: "10px"
  }
}));
