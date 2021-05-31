import { useState } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { GetServerSideProps } from "next";
import { connect } from "react-redux";
import { getAuthToken } from "../src/utils";
import { RootState } from "../src/store/store";
import { authenticate } from "../src/store/actions/auth";
import LoginForm from "../src/components/LoginForm/LoginForm";
import SignUpForm from "../src/components/SignUpForm/SignUpForm";

interface IndexProps {
  initialReduxState?: RootState;
  authenticate: any;
};

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "25px",
    padding: "16px",
    borderRadius: "5px",
    position: "relative"
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
  usernameField: {
    margin: "0"
  },
  passwordField: {
    margin: "12px 0"
  },
  button: {
    fontWeight: "bold"
  },
  formError: {
    margin: "12px 0 0 0",
    textAlign: "left",
    "& .MuiTypography-root": {
      padding: "12px 0",
      fontWeight: "bold",
    }
  }
}));

function Index(props: IndexProps) {
  const classes = useStyles();
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <>
      <Head>
        <title>Everest | Login</title>
      </Head>
      <Container maxWidth="sm" className={classes.container}>
        {/* {showLoginForm ? (
          <LoginForm setShowLoginForm={setShowLoginForm} />
        ) : (
          <SignUpForm setShowLoginForm={setShowLoginForm} />
        )} */}
        <LoginForm in={showLoginForm} setShowLoginForm={setShowLoginForm} />
        <SignUpForm in={!showLoginForm} setShowLoginForm={setShowLoginForm} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = getAuthToken;

export default connect((state: RootState) => ({

}), {
  authenticate
})(Index);
