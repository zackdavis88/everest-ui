import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect, forwardRef } from "react";
import { DeleteModalProps } from "./DeleteModal.props";
import { useWidth } from "../../utils";
import DialogModal from "../DialogModal/DialogModal";

const DeleteModal = (props: DeleteModalProps) => {
  const breakpoint = useWidth();
  const [confirmInput, setConfirmInput] = useState({value: "", error: ""});
  const [requestInProgress, setRequestInProgress] = useState(false);
  const submitDisabled = !!(
    !confirmInput.value ||
    confirmInput.error ||
    requestInProgress
  );
  
  useEffect(() => { // Effect to wipe all form data once closed.
    if(!props.isOpen){
      setConfirmInput({value: "", error: ""});
      setRequestInProgress(false);
    }
  }, [props.isOpen]);

  const confirmFieldProps = {
    id: "confirm-input",
    required: true,
    fullWidth: true,
    type: "text",
    label: `${props.resourceType} Name`,
    value: confirmInput.value,
    error: !!confirmInput.error,
    helperText: confirmInput.error,
    onChange: (event) => setConfirmInput({value: event.target.value, error: ""})
  };
  
  const onSubmit = async(event: any) => {
    event.preventDefault();
    setRequestInProgress(true);
    const confirmValue = confirmInput.value;

    if(confirmValue !== props.resource.name){
      setConfirmInput({...confirmInput, error: `input does not match ${props.resourceType.toLowerCase()} name`});
      return setRequestInProgress(false);
    }

    const response = await props.deleteResource(props.resource.id, confirmValue);
    const error: string = response.error || "";
    if(error){
      setRequestInProgress(false);
      props.handleClose();
      return props.showNotification(error, "error");
    }

    setRequestInProgress(false);
    props.handleClose(true);
  };

  return (
    <DialogModal
      title={`Delete ${props.resourceType}`}
      isOpen={props.isOpen}
      handleClose={props.handleClose}
      onSubmit={onSubmit}
      maxWidth="sm"
      id={`delete-resource-modal`}
      fullscreen={breakpoint === "xs"}
      submitDisabled={submitDisabled}
      isForm={true}
    >
      <Typography variant="body1" component="div">
        <b><em>Warning:</em></b> Once a resource has been deleted it can not be recovered.
      </Typography>
      <Typography variant="body2" component="div">
        Enter the blueprint name <b>{props.resource.name}</b> below to proceed.
      </Typography>
      <TextField variant="filled" {...confirmFieldProps} />
    </DialogModal>
  );
};

export default DeleteModal;
