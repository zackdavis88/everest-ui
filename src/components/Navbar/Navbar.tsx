import {useState, useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import { faMountain, faBars, faKey, faSignOutAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { useStyles } from "./Navbar.styles";
import { RootState } from "../../store/store";
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";
import Menu from "../Menu/Menu";

function Navbar(props) {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (newOpenState) => (event) => {
    if(event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")){
      return;
    }
    return setSidebarOpen(newOpenState);
  };

  useEffect(() => {
    const resizeCallback = () => setSidebarOpen(false);
    window.addEventListener("resize", resizeCallback);
    return () => window.removeEventListener("resize", resizeCallback);
  }, []);

  const navigationItems = [{
    name: "Components",
    url: "/"
  }, {
    name: "Fragments",
    url: "/page2"
  }, {
    name: "Layouts",
    url: "/page2"
  }];

  const userMenuProps = {
    id: "navbar-user-menu",
    menuName: props.user && props.user.displayName || "booya",
    menuItems: [{
      name: "Change Password",
      startIcon: <FontAwesomeIcon icon={faKey}/>,
      onClick: () => {
        console.log("Change Password");
      }
    }, {
      name: "Sign Out",
      startIcon: <FontAwesomeIcon icon={faSignOutAlt}/>,
      onClick: () => console.log("Logout")
    }],
    endIcon: <FontAwesomeIcon icon={faCaretDown} />
  };

  const sidebarProps = {
    isOpen: sidebarOpen,
    onClose: toggleSidebar(false),
    navigationItems: [
      ...navigationItems,
      {
        name: "My Account",
        navigationItems: [...userMenuProps.menuItems]
      }
    ],
    closeSidebar: () => setSidebarOpen(false)
  };

  const renderBranding = () => (
    <Typography component="h4" variant="h4" className={classes.brandText}>
      <FontAwesomeIcon icon={faMountain} className={classes.brandIcon} />
      EVEREST
    </Typography>
  );

  const renderNavigation = () => (
    <>
      <Hidden implementation="css" mdUp>
        <IconButton color="inherit" onClick={toggleSidebar(!sidebarOpen)}>
          <FontAwesomeIcon icon={faBars}/>
        </IconButton>
        <Sidebar {...sidebarProps}/>
      </Hidden>
      <Hidden implementation="css" smDown>
        {navigationItems.map((item, index) => (
          <Link key={index} href={item.url}>
            <Button component="a" color="inherit" className={classes.navItem}>{item.name}</Button>
          </Link>
        ))}
      </Hidden>
    </>
  );
  
  const renderUserMenu = () => (
    <Hidden implementation="css" smDown>
      <Menu {...userMenuProps} />
    </Hidden>
  );
  
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar} disableGutters>
        <Grid container alignItems="center" justify="center" className={classes.gridContainer}>
          <Grid item xs={2} sm={4} lg={4} className={classes.gridItem}>
            {renderNavigation()}
          </Grid>
          <Grid item xs={8} sm={4} lg={4} className={classes.gridItem}>
            {renderBranding()}
          </Grid>
          <Grid item xs={2} sm={4} lg={4} className={classes.gridItem}>
            {renderUserMenu()}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default connect((state: RootState) => ({
  user: state.auth.user
}), {

})(Navbar);
