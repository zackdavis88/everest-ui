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
import { useStyles } from "./DeleteModal.styles";
import { DeleteModalProps } from "./DeleteModal.props";
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { useWidth } from "../../utils";

const SlideTransition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal = (props: DeleteModalProps) => {
  const classes = useStyles(props);
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
    <Dialog onClose={props.handleClose} aria-labelledby="delete-resource-modal" open={props.isOpen} maxWidth="sm" fullWidth TransitionComponent={SlideTransition} fullScreen={breakpoint === "xs"}>
      <DialogTitle id="delete-resource-modal" disableTypography className={classes.dialogTitle}>
        <Typography variant="h6">
          Delete {props.resourceType}
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
          <FontAwesomeIcon icon={faTimes} fixedWidth />
        </IconButton>
      </DialogTitle>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <DialogContent dividers className={classes.dialogContent}>
            <Typography variant="body1" component="div">
              <b><em>Warning:</em></b> Once a resource has been deleted it can not be recovered.
            </Typography>
            <Typography variant="body2" component="div">
              Enter the blueprint name <b>{props.resource.name}</b> below to proceed.
            </Typography>
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

export default DeleteModal;
