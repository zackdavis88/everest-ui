import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#144E69",
    height: "64px",
    position: "relative"
  },
  gridContainer: {
    height: "100%"
  },
  gridItem: {
    "& #navbar-user-menu": {
      textAlign: "right",
      margin: "0 13px",
      "& .MuiButton-root": {
        [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
          fontSize: "14px"
        },
        [theme.breakpoints.down(theme.breakpoints.values.lg)]: {
          fontSize: "12px"
        }
      }
    }
  },
  brandIcon: {
    "&.fa-mountain": {
      marginRight: "8px",
      [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
        width: "35px",
        height: "35px"
      },
      [theme.breakpoints.down(theme.breakpoints.values.lg)]: {
        width: "30px",
        height: "30px"
      }
    }
  },
  brandText: {
    width: "100%",
    display: "block",
    fontWeight: "bold",
    lineHeight: "64px",
    textAlign: "center",
    [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
      fontSize: "35px"
    },
    [theme.breakpoints.down(theme.breakpoints.values.lg)]: {
      fontSize: "30px"
    }
  },
  navItem: {
    fontWeight: "bold",
    height: "64px",
    borderRadius: "0",
    margin: "0 5px",
    [theme.breakpoints.up(theme.breakpoints.values.lg)]: {
      fontSize: "14px"
    },
    [theme.breakpoints.down(theme.breakpoints.values.lg)]: {
      fontSize: "12px"
    }
  }
}));