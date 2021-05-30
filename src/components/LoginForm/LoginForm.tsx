import { useState, useRef } from "react";
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

const LoginForm = (props: LoginFormProps) => {
  const classes = useStyles();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const usernameField = {
    id: "username-input",
    type: "text",
    label: "Username",
    className: classes.usernameField,
    fullWidth: true,
    inputRef: usernameRef,
    onChange: () => {
      if(formError)
        return setFormError("");
    }
  };
  const passwordField = {
    id: "password-input",
    type: "password",
    label: "Password",
    className: classes.passwordField,
    fullWidth: true,
    inputRef: passwordRef,
    onChange: () => {
      if(formError)
        return setFormError("");
    }
  };
  const onSubmit = async(event) => {
    event.preventDefault();
    setFormError("");
    const username = usernameRef.current.value || "";
    const password = passwordRef.current.value || "";
    const response = await props.authenticate(username, password);
    if(response.error)
      return setFormError(response.error);
    
    usernameRef.current.value = "";
    passwordRef.current.value = "";

    router.push(router.query.redirectUrl as UrlObject || "/home");
  };
  return (
    <Box boxShadow={3} borderRadius="10px" className={classes.box} bgcolor="secondary.light" zIndex={"100"}>
      
      {/* Form Heading */}
      <Typography variant="h4" component="h4" className={classes.heading}>
        Login Required
      </Typography>
      <Divider />

      {/* Form Sub-Heading */}
      <Typography variant="body1" component="div" className={classes.subHeading}>
        Authentication is required to use Everest. Please login or register below.
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
            <Button className={classes.button} variant="contained" size="large"  type="submit" fullWidth color="primary" startIcon={<FontAwesomeIcon icon={faSignInAlt} fixedWidth />}>
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
  );
};

export default connect((state: RootState) => ({

}), {
  authenticate
})(LoginForm);
