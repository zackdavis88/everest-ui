import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authenticate } from "../../store/actions/auth";
import { useRouter } from "next/router";
import { UrlObject } from "url";
import { useStyles } from "./LoginForm.styles";
import { LoginFormProps } from "./LoginForm.props";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";

const LoginForm = (props: LoginFormProps) => {
  const classes = useStyles();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const submitDisabled = () => !(usernameInput && passwordInput) || props.authInProgress;
  const usernameField = {
    id: "username-input",
    required: true,
    type: "text",
    label: "Username",
    className: classes.usernameField,
    fullWidth: true,
    value: usernameInput,
    onChange: (event) => {
      if(formError)
        setFormError("");
      
      setUsernameInput(event.target.value);
    }
  };
  const passwordField = {
    id: "password-input",
    required: true,
    type: "password",
    label: "Password",
    className: classes.passwordField,
    fullWidth: true,
    value: passwordInput,
    onChange: (event) => {
      if(formError)
        setFormError("");

      setPasswordInput(event.target.value);
    }
  };
  const onSubmit = async(event) => {
    event.preventDefault();
    setFormError("");
    const username = usernameInput || "";
    const password = passwordInput || "";
    const response = await props.authenticate(username, password);
    if(response.error)
      return setFormError(response.error);

    setUsernameInput("");
    setPasswordInput("");

    router.push(router.query.redirectUrl as UrlObject || "/home");
  };
  return (
    <Slide direction="right" in={props.in} appear={false}>
      <Container maxWidth="sm" className={classes.container}>
        <Box boxShadow={3} borderRadius="10px" className={classes.box} bgcolor="secondary.light">
          {/* Form Heading */}
          <Typography variant="h4" component="h4" className={classes.heading}>
            Login Required
          </Typography>
          <Divider />

          {/* Form Sub-Heading */}
          <Typography variant="body1" component="div" className={classes.subHeading}>
            Authentication is required to use Everest. Please login or sign up below.
          </Typography>
          <Divider />

          {/* Form Error Message */}
          <Collapse in={!!formError}>
            <Box boxShadow={1} borderRadius="10px" className={`${classes.box} ${classes.formError}`} bgcolor="error.main">
              <Typography variant="subtitle1" component="div">
                {formError}
              </Typography>
            </Box>
          </Collapse>

          {/* Form Inputs and Controls */}
          <form noValidate autoComplete="off" className={classes.form} onSubmit={onSubmit}>
            <TextField variant="filled" {...usernameField} />
            <TextField variant="filled" {...passwordField} />
            <Grid container spacing={2} justify="center">
              <Grid item xs={12} sm={6}>
                <Button className={classes.button} variant="contained" size="large"  type="submit" fullWidth color="primary" startIcon={<FontAwesomeIcon icon={faSignInAlt} fixedWidth />} disabled={submitDisabled()}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button onClick={() => props.setShowLoginForm(false)} className={classes.button} variant="outlined" size="large" fullWidth color="primary" startIcon={<FontAwesomeIcon icon={faUserPlus} fixedWidth />}>
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Slide>
  );
};

export default connect((state: RootState) => ({
  authInProgress: state.auth.isLoading
}), {
  authenticate
})(LoginForm);
