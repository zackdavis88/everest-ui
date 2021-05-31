import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  sidebarMenu: {
    width: "100%"
  },
  menuItem: {
    width: "100%"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: "240px",
    background: theme.palette.primary.main,
    padding: "15px",
    fontSize: "0.875rem",
    color: "#FFFFFF"
  },
  drawerRoot: {
    "&.MuiDrawer-modal": {
      top: `64px !important`,
      height: `calc(100% - 64px)`,
    },
    // "& .MuiBackdrop-root": {
    //   top: `64px`,
    //   height: `calc(100% - 64px)`,
    // },
    "& .MuiListItemText-primary": {
      fontSize: "0.875rem",
      fontWeight: "bold"
    },
    "& .MuiDivider-root": {
      backgroundColor: "#FFFFFF"
    },
    "& .MuiListItemText-inset": {
      paddingLeft: "15px"
    }
  }
}));
