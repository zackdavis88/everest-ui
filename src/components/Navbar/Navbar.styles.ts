import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  appbar: {
    "&.MuiAppBar-positionSticky": {
      top: 0
    }
  },
  toolbar: {
    height: "64px",
    position: "relative"
  },
  gridContainer: {
    height: "100%",
    "& #navbar-brand": {
      textAlign: "center",
    }
  },
  gridItem: {
    "& #navbar-user-menu": {
      textAlign: "right",
      [theme.breakpoints.down(theme.breakpoints.values.lg)]:{
        "& .MuiButton-label": {
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
    display: "inline",
    fontWeight: "bold",
    lineHeight: "64px",
    cursor: "pointer",
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
    padding: "6px 8px"
  },
  navIcon: {
    "&.fa-sitemap": {
      width: "35px"
    }
  },
  menuIcon: {
    "&.fa-caret-down": {
      width: "12px"
    }
  }
}));
