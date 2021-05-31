import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    "& > div": {
      margin: "0 0 12px 0"
    },
    "& > div:last-of-type": {
      margin: "0"
    }
  },
  dialogActions: {
    padding: "16px 24px",
    "& > button": {
      fontWeight: "bold"
    },
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      "& > button.MuiButton-outlined": {
        margin: "8px 0 0 0"
      }
    }
  }
}));
