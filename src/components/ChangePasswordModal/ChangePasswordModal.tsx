import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import { ChangePasswordModalProps } from "./ChangePasswordModal.props";
import { updatePassword } from "../../store/actions/user";
import { showNotification } from "../../store/actions/notification";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { useWidth } from "../../utils";
import DialogModal from "../DialogModal/DialogModal";

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
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
    <DialogModal
      title="Change Password"
      isOpen={props.isOpen}
      handleClose={props.handleClose}
      onSubmit={onSubmit}
      maxWidth="sm"
      id="change-password-modal"
      fullscreen={breakpoint === "xs"}
      submitDisabled={submitDisabled}
      isForm={true}
    >
      <TextField variant="filled" {...currentFieldProps} />
      <TextField variant="filled" {...newFieldProps} />
      <TextField variant="filled" {...confirmFieldProps} />
    </DialogModal>
  );
};

export default connect((state: RootState) => ({
  user: state.auth.user
}), {
  updatePassword,
  showNotification
})(ChangePasswordModal);
