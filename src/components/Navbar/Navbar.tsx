import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid, {GridItemsAlignment, GridDirection, GridJustification} from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import { faMountain, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { useStyles } from "./Navbar.styles";
import { RootState } from "../../store/store";
import Link from "next/link";

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

function Navbar() {
  const classes = useStyles();
  const renderBranding = () => (
    <Typography component="h4" variant="h4" className={classes.brandText}>
      <FontAwesomeIcon icon={faMountain} className={classes.brandIcon} />
      EVEREST
    </Typography>
  );
  // const renderNavigation = () => (
  //   <>
  //     <Hidden implementation="css" lgUp>
  //       <IconButton color="inherit">
  //         <FontAwesomeIcon icon={faBars}/>
  //       </IconButton>
  //     </Hidden>
  //     <Hidden implementation="css" mdDown>
  //       {navigationItems.map((item, index) => (
  //         <Link key={index} href={item.url}>
  //           <Button component="a" color="inherit">{item.name}</Button>
  //         </Link>
  //       ))}
  //     </Hidden>
  //   </>
  // );
  const renderNavigation = () => (
    <>
      <Hidden implementation="css" mdUp>
        <IconButton color="inherit">
          <FontAwesomeIcon icon={faBars}/>
        </IconButton>
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
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar} disableGutters>
        <Grid container alignItems="center" justify="center" className={classes.gridContainer}>
          <Grid item xs={2} sm={4} lg={4} className={classes.gridItem}>
            {renderNavigation()}
          </Grid>
          <Grid item xs={8} sm={4} lg={4} className={classes.gridItem} zeroMinWidth>
            {renderBranding()}
          </Grid>
          <Grid item xs={2} sm={4} lg={4} className={classes.gridItem}>
            booya
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
