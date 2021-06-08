import { Theme } from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator";
import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    position: "relative",
    "& .MuiTableHead-root .MuiTableCell-root": {
      fontWeight: "bold"
    },
    "& .MuiTableCell-root": {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    },
    "& .MuiTablePagination-toolbar": {
      flexWrap: "wrap",
      "& > .MuiTablePagination-spacer": {
        flex: "none"
      }
    },
    "& .fa-ellipsis-v": {
      width: "8px"
    },
    "& #table-loading-overlay": {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 100,
      backgroundColor: fade(theme.palette.common.white, 0.4)
    },
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      "& .hidden-md": {
        display: "none"
      }
    },
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      "& .hidden-sm": {
        display: "none"
      }
    }
  },
  paginationIcon: {
    "&.fa-fw": {
      width: "1.25em"
    }
  },
  mobileSpacer: {
    display: "flex", 
    flex: "1 0 100%"
  },
  actionsContainer: {
    display: "flex"
  },
  tableEmptyContainer: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.info.main,
    padding: "20px",
    borderRadius: "5px",
    margin: "16px 0 0 0"
  }
}));
