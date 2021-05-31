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
import { faUserPlus, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUser } from "../../store/actions/user";
import { showNotification } from "../../store/actions/notification";
import { useStyles } from "./SignUpForm.styles";
import { SignUpFormProps } from "./SignUpForm.props";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";

const SignUpForm = (props: SignUpFormProps) => {
  const classes = useStyles();
  const [usernameInput, setUsernameInput] = useState({value: "", error: ""});
  const [passwordInput, setPasswordInput] = useState({value: "", error: ""});
  const [confirmInput, setConfirmInput] = useState({value: "", error: ""});
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [formError, setFormError] = useState("");
  const submitDisabled = () => !!(
    !(usernameInput.value && passwordInput.value && confirmInput.value) ||
    (usernameInput.error || passwordInput.error || confirmInput.error) ||
    requestInProgress
  );
  const usernameField = {
    id: "username-input",
    required: true,
    type: "text",
    label: "Username",
    className: classes.usernameField,
    fullWidth: true,
    value: usernameInput.value,
    error: !!usernameInput.error,
    helperText: usernameInput.error,
    onChange: (event) => {
      if(formError)
        setFormError("");
      
      setUsernameInput({value: event.target.value, error: ""});
    }
  };
  const passwordField = {
    id: "password-input",
    required: true,
    type: "password",
    label: "Password",
    className: classes.passwordField,
    fullWidth: true,
    value: passwordInput.value,
    error: !!passwordInput.error,
    helperText: passwordInput.error,
    onChange: (event) => {
      if(formError)
        setFormError("");

      setPasswordInput({value: event.target.value, error: ""});
    }
  };
  const confirmField = {
    id: "confirm-input",
    required: true,
    type: "password",
    label: "Confirm Password",
    className: classes.confirmField,
    fullWidth: true,
    value: confirmInput.value,
    error: !!confirmInput.error,
    helperText: confirmInput.error,
    onChange: (event) => {
      if(formError)
        setFormError("");
      
      setConfirmInput({value: event.target.value, error: ""});
    }
  };
  const onSubmit = async(event) => {
    event.preventDefault();
    setRequestInProgress(true);
    setFormError("");
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    if(password !== confirm){
      const message = "password inputs must be matching";
      setConfirmInput({...confirmInput, error: message});
      return setRequestInProgress(false);
    }

    const response = await props.createUser(username, password);
    const error: string = response.error;
    if(error && error.startsWith("username")){
      setUsernameInput({...usernameInput, error: error});
      return setRequestInProgress(false);
    }
    else if(error && error.startsWith("password")){
      setPasswordInput({...passwordInput, error: error});
      return setRequestInProgress(false);
    }
    else if(error){
      setFormError(error);
      return setRequestInProgress(false);
    }

    setRequestInProgress(false);
    props.setShowLoginForm(true);
    props.showNotification("User has been successfully created, login below.", "success")
  };
  return (
    <Slide direction="right" in={props.in}>
      <Container maxWidth="sm" className={classes.container}>
        <Box boxShadow={3} borderRadius="10px" className={classes.box} bgcolor="secondary.light" zIndex={"100"}>
          
          {/* Form Heading */}
          <Typography variant="h4" component="h4" className={classes.heading}>
            User Sign Up
          </Typography>
          <Divider />

          {/* Form Sub-Heading */}
          <Typography variant="body1" component="div" className={classes.subHeading}>
            Fill out the form below with your details to create an Everest account.
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
            <TextField variant="filled" {...confirmField} />
            <Grid container spacing={2} justify="center">
              <Grid item xs={12} sm={6}>
                <Button className={classes.button} variant="contained" size="large"  type="submit" fullWidth color="primary" startIcon={<FontAwesomeIcon icon={faUserPlus} fixedWidth />} disabled={submitDisabled()}>
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button onClick={() => props.setShowLoginForm(true)} className={classes.button} variant="outlined" size="large" fullWidth color="primary" startIcon={<FontAwesomeIcon icon={faArrowCircleLeft} fixedWidth />}>
                  Back
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

}), {
  createUser,
  showNotification
})(SignUpForm);
