import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid, {GridItemsAlignment, GridDirection, GridJustification} from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { faMountain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { useStyles } from "./Navbar.styles";
import { RootState } from "../../store/store";

function Navbar() {
  const classes = useStyles();
  const rootContainerProps = {
    container: true,
    justify: "space-between" as GridJustification,
    alignItems: "center" as GridItemsAlignment,
    className: classes.rootContainer
  };
  const brandContainerProps = {
    container: true,
    direction: "row" as GridDirection,
    justify: "center" as GridJustification,
    alignItems: "center" as GridItemsAlignment
  };
  const renderBranding = () => (
    <Grid {...brandContainerProps}>
      <Grid item>
        <FontAwesomeIcon icon={faMountain} className={classes.brandIcon}/>
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h4" className={classes.brandText}>
          Everest
        </Typography>
      </Grid>
    </Grid>
  );
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Grid {...rootContainerProps}>
          <Grid item></Grid>
          
          
          <Grid item>
            {renderBranding()}
          </Grid>


          <Grid item></Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default connect((state: RootState) => ({
  user: state.auth.user
}), {

})(Navbar);
