import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-root": {
      textTransform: "none",
      fontWeight: "bold",
      fontSize: "14px"
    }
  },
  itemStartIcon: {
    marginRight: "5px"
  },
  itemEndIcon: {
    marginLeft: "5px"
  },
  popper: {
    zIndex: theme.zIndex.appBar + 1
  }
}));
