import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#144E69",
    height: "64px",
  },
  rootContainer: {
    height: "100%"
  },
  brandIcon: {
    "&.fa-mountain": {
      width: "35px",
      height: "35px",
      marginRight: "8px"
    }
  },
  brandText: {
    display: "inline-block",
    fontWeight: "bold"
  }
}));