import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, forwardRef } from "react";
import { useStyles } from "./ChangePasswordModal.styles";
import { ChangePasswordModalProps } from "./ChangePasswordModal.props";
import { updatePassword } from "../../store/actions/user";
import { showNotification } from "../../store/actions/notification";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { useWidth } from "../../utils";

const SlideTransition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const classes = useStyles(props);
  const breakpoint = useWidth();
  const [currentInput, setCurrentInput] = useState({value: "", error: ""});
  const [newInput, setNewInput] = useState({value: "", error: ""});
  const [confirmInput, setConfirmInput] = useState({value: "", error: ""});
  const [requestInProgress, setRequestInProgress] = useState(false);
  const submitDisabled = !!(
    !(currentInput.value && newInput.value && confirmInput.value) ||
    (currentInput.error || newInput.error || confirmInput.error) ||
    requestInProgress
  );
  
  useEffect(() => { // Effect to wipe all form data once closed.
    if(!props.isOpen){
      setCurrentInput({value: "", error: ""});
      setNewInput({value: "", error: ""});
      setConfirmInput({value: "", error: ""});
      setRequestInProgress(false);
    }
  }, [props.isOpen]);

  const currentFieldProps = {
    id: "current-password-input",
    required: true,
    fullWidth: true,
    type: "password",
    label: "Current Password",
    value: currentInput.value,
    error: !!currentInput.error,
    helperText: currentInput.error,
    onChange: (event) => setCurrentInput({value: event.target.value, error: ""})
  };
  const newFieldProps = {
    id: "new-password-input",
    required: true,
    fullWidth: true,
    type: "password",
    label: "New Password",
    value: newInput.value,
    error: !!newInput.error,
    helperText: newInput.error,
    onChange: (event) => setNewInput({value: event.target.value, error: ""})
  };
  const confirmFieldProps = {
    id: "confirm-password-input",
    required: true,
    fullWidth: true,
    type: "password",
    label: "Confirm Password",
    value: confirmInput.value,
    error: !!confirmInput.error,
    helperText: confirmInput.error,
    onChange: (event) => setConfirmInput({value: event.target.value, error: ""})
  };
  
  const onSubmit = async(event: any) => {
    event.preventDefault();
    setRequestInProgress(true);
    const currentPassword = currentInput.value;
    const newPassword = newInput.value;
    const confirmPassword = confirmInput.value;

    if(newPassword !== confirmPassword){
      setConfirmInput({...confirmInput, error: "password inputs must be matching"});
      return setRequestInProgress(false);
    }

    const response = await props.updatePassword(props.user.username, currentPassword, newPassword);
    const error: string = response.error || "";
    if(error && error.startsWith("current")){
      setCurrentInput({...currentInput, error});
      return setRequestInProgress(false);
    }
    else if(error && error.startsWith("password")){
      setNewInput({...newInput, error});
      return setRequestInProgress(false);
    }
    else if(error){
      setRequestInProgress(false);
      props.handleClose();
      return props.showNotification(error, "error");
    }

    setRequestInProgress(false);
    props.handleClose();
    return props.showNotification("Your password has been successfully updated.", "success");
  };

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="change-password-modal" open={props.isOpen} maxWidth="sm" fullWidth TransitionComponent={SlideTransition} fullScreen={breakpoint === "xs"}>
      <DialogTitle id="change-password-modal" disableTypography className={classes.dialogTitle}>
        <Typography variant="h6">
          Change Password
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
          <FontAwesomeIcon icon={faTimes} fixedWidth />
        </IconButton>
      </DialogTitle>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <DialogContent dividers className={classes.dialogContent}>
            <TextField variant="filled" {...currentFieldProps} />
            <TextField variant="filled" {...newFieldProps} />
            <TextField variant="filled" {...confirmFieldProps} />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant="contained" color="primary" fullWidth size="large" type="submit" disabled={submitDisabled}>
            Submit
          </Button>
          <Button autoFocus variant="outlined" onClick={props.handleClose} color="primary" fullWidth size="large">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default connect((state: RootState) => ({
  user: state.auth.user
}), {
  updatePassword,
  showNotification
})(ChangePasswordModal);
