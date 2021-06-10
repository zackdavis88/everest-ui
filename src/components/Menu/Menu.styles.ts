import {makeStyles} from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-root": {
      textTransform: "none",
      fontWeight: "bold",
      fontSize: "14px",
      color: "inherit",
      padding: "6px 8px",
      "&:focus": {
        backgroundColor: fade(theme.palette.common.white, 0.1)
      }
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
