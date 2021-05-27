import { useState } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { GetServerSideProps } from "next";
import { connect } from "react-redux";
import { getAuthToken } from "../src/utils";
import { RootState } from "../src/store/store";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "25px",
    padding: "0",
    borderRadius: "10px"
  },
  box: {
    padding: "0 25px"
  },
  heading: {
    color: theme.palette.text.primary,
    textAlign: "center",
    padding: "5px 0",
    fontWeight: "bold"
  },
  subHeading: {
    color: theme.palette.text.primary,
    textAlign: "center"
  },
  form: {
    padding: "16px 0"
  },
  textField: {

  },
  usernameField: {
    margin: "0"
  },
  passwordField: {
    margin: "12px 0"
  },
  button: {
    fontWeight: "bold"
  }
}));

function Index(props) {
  const classes = useStyles();
  const usernameField = {
    id: "username-input",
    type: "text",
    label: "Username",
    className: `${classes.textField} ${classes.usernameField}`,
    fullWidth: true
  };
  const passwordField = {
    id: "password-input",
    type: "password",
    label: "Password",
    className: `${classes.textField} ${classes.passwordField}`,
    fullWidth: true
  };
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <Container maxWidth="sm" className={classes.container}>
        <Box boxShadow={3} borderRadius="10px" className={classes.box} bgcolor="secondary.light">
          <Typography variant="h4" component="h4" className={classes.heading}>
            Login Required
          </Typography>
          <Divider />
          <Typography variant="body1" component="div" className={classes.subHeading}>
            Authentication is required to use Everest. Please login or register below.
          </Typography>
          <Divider />
          <form noValidate autoComplete="off" className={classes.form}>
            <TextField variant="filled" {...usernameField} />
            <TextField variant="filled" {...passwordField} />
            <Grid container spacing={2} justify="center">
            <Grid item xs={12} sm={6}>
            <Button className={classes.button} variant="contained" size="large" fullWidth color="primary" startIcon={<FontAwesomeIcon icon={faSignInAlt} size="sm" fixedWidth />}>
              Login
            </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button className={classes.button} variant="outlined" size="large" fullWidth color="primary" startIcon={<FontAwesomeIcon icon={faUserPlus} fixedWidth />}>
                Sign Up
              </Button>
            </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = getAuthToken;

export default connect((state: RootState) => ({
  auth: state.auth
}), {})(Index);
