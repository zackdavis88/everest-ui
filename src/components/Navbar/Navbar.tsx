import {useState, useEffect, ReactElement} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import { 
  faMountain, 
  faBars, 
  faKey, 
  faSignOutAlt, 
  faCaretDown, 
  faCubes, 
  faCode, 
  faTh, 
  faLaptopCode,
  faSitemap
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { useStyles } from "./Navbar.styles";
import { RootState } from "../../store/store";
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";
import Menu from "../Menu/Menu";
import { NavbarProps } from "./Navbar.props";
import { logout } from "../../store/actions/auth";
import { useWidth } from "../../utils";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

function Navbar(props: NavbarProps) {
  const classes = useStyles();
  const breakpoint = useWidth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isAuthenticated = props.user || false;

  const toggleSidebar = (newOpenState) => (event) => {
    if(event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")){
      return;
    }
    return setSidebarOpen(newOpenState);
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    const resizeCallback = () => setSidebarOpen(false);
    window.addEventListener("resize", resizeCallback);
    return () => window.removeEventListener("resize", resizeCallback);
  }, []);

  const userMenuProps = {
    id: "navbar-user-menu",
    menuName: props.user && props.user.displayName || "My Account",
    menuItems: [{
      name: "Change Password",
      startIcon: <FontAwesomeIcon icon={faKey} fixedWidth/>,
      onClick: handleModalOpen
    }, {
      name: "Sign Out",
      startIcon: <FontAwesomeIcon icon={faSignOutAlt} fixedWidth/>,
      onClick: () => props.logout()
    }],
    endIcon: <FontAwesomeIcon icon={faCaretDown} fixedWidth/>
  };

  const navItems = [{
      name: "Blueprints",
      startIcon: <FontAwesomeIcon icon={faCubes} fixedWidth size="lg" />,
      url: "/blueprints"
    }, {
      name: "Components",
      startIcon: <FontAwesomeIcon icon={faCode} fixedWidth size="lg"/>,
      url: "/components"
    }, {
      name: "Layouts",
      startIcon: <FontAwesomeIcon icon={faTh} fixedWidth size="lg"/>,
      url: "/layouts"
    }, {
      name: "Fragments",
      startIcon: <FontAwesomeIcon icon={faLaptopCode} fixedWidth size="lg"/>,
      url: "/fragments"
    }];

  const sidebarProps: {
    isOpen: boolean;
    onClose: (event: any) => void;
    navigationItems: {
      name: string;
      startIcon?: ReactElement;
      url?: string;
      onClick?: any;
      navigationItems?: {
        name: string;
        startIcon?: ReactElement;
        url?: string;
        onClick?: any;
      }[]
    }[];
    closeSidebar: () => void;
  } = {
    isOpen: sidebarOpen,
    onClose: toggleSidebar(false),
    navigationItems: [...navItems],
    closeSidebar: () => setSidebarOpen(false)
  };
  
  if(breakpoint === "sm" || breakpoint === "xs"){
    sidebarProps.navigationItems = [
      ...sidebarProps.navigationItems,
      {
        name: "My Account",
        navigationItems: [...userMenuProps.menuItems]
      }
    ];
  }

  const renderBranding = () => (
    <Link href={isAuthenticated ? "/home" : "/"}>
      <Typography component="a" variant="h4" className={classes.brandText}>
        <FontAwesomeIcon icon={faMountain} className={classes.brandIcon} />
        EVEREST
      </Typography>
    </Link>
  );

  const renderNavigation = () => (
    <>
      <Hidden implementation="css" mdUp>
        <IconButton color="inherit" onClick={toggleSidebar(!sidebarOpen)}>
          <FontAwesomeIcon icon={faBars}/>
        </IconButton>
      </Hidden>
      <Hidden implementation="css" smDown>
        <Button variant="text" color="inherit" className={classes.navItem} startIcon={<FontAwesomeIcon icon={faSitemap} fixedWidth/>} onClick={toggleSidebar(!sidebarOpen)}>
          Navigation Menu
        </Button>
      </Hidden>
      <Sidebar {...sidebarProps}/>
    </>
  );
  
  const renderUserMenu = () => (
    <Hidden implementation="css" smDown>
      <Menu {...userMenuProps} />
    </Hidden>
  );
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.toolbar}>
          <Grid container alignItems="center" justify="center" className={classes.gridContainer}>
            <Grid item xs={2} sm={4} lg={4} className={classes.gridItem}>
              {isAuthenticated && renderNavigation()}
            </Grid>
            <Grid id="navbar-brand" item xs={8} sm={4} lg={4} className={classes.gridItem}>
              {renderBranding()}
            </Grid>
            <Grid item xs={2} sm={4} lg={4} className={classes.gridItem}>
              {isAuthenticated && renderUserMenu()}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <ChangePasswordModal isOpen={modalOpen} handleClose={handleModalClose} />
    </>
  );
}

export default connect((state: RootState) => ({
  user: state.auth.user
}), {
  logout
})(Navbar);
