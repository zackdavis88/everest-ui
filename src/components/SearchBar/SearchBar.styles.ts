import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) => ({
  searchContainer: {
    margin: "16px 0 0 0",
    "& button": {
      height: "40px",
      margin: "0 0 0 8px",
      padding: "4px 10px"
    }
  }
}));
