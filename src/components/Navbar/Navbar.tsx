import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { faMountain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    backgroundColor: "#144E69"
  },
  brandContainer: {
    textAlign: "center"
  },
  brandIcon: {
    "&.fa-mountain": {
      width: "40px",
      height: "40px",
      paddingTop: "8px",
      marginRight: "8px"
    }
  },
  brandText: {
    display: "inline-block",
    fontWeight: "bold"
  }
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.rootContainer}>
      <Toolbar>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className={classes.brandContainer}>
            <FontAwesomeIcon icon={faMountain} className={classes.brandIcon} />
            <Typography variant="h4" component="h4" className={classes.brandText}>Everest</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          News
        </Typography>
        <Button color="inherit" style={{}}>Login</Button> */}
      </Toolbar>
    </AppBar>
  );
}

export default connect((state) => ({
  user: state["auth"].user
}), {

})(Navbar);
