import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef } from "react";
import { useStyles } from "./DialogModal.styles";
import { DialogModalProps } from "./DialogModal.props";
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from "@material-ui/core/transitions/transition";

const SlideTransition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogModal = (props: DialogModalProps) => {
  const classes = useStyles(props);
  const renderBodyAndActions = () => {
    const cancelBtnAutoFocus = typeof props.autoFocus === "boolean" ? props.autoFocus : true;
    return (
      <>
        <DialogContent dividers className={classes.dialogContent}>
          {props.children}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant="contained" color="primary" fullWidth size="large" disabled={props.submitDisabled} type={props.isForm ? "submit" : "button"} onClick={props.isForm ? null : props.onSubmit}>
            Submit
          </Button>
          <Button autoFocus={cancelBtnAutoFocus} variant="outlined" onClick={props.handleClose} color="primary" fullWidth size="large">
            Cancel
          </Button>
        </DialogActions>
      </>
    );
  };
  return (
    <Dialog onClose={props.handleClose} aria-labelledby={props.id} open={props.isOpen} maxWidth={props.maxWidth} fullWidth TransitionComponent={SlideTransition} fullScreen={props.fullscreen}>
      <DialogTitle id={props.id} disableTypography className={classes.dialogTitle}>
        <Typography variant="h6">
          {props.title}
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
          <FontAwesomeIcon icon={faTimes} fixedWidth />
        </IconButton>
      </DialogTitle>
      {props.isForm ? (
        <form noValidate autoComplete="off" onSubmit={props.onSubmit}>
          {renderBodyAndActions()}
        </form>
      ) : (
        <>
          {renderBodyAndActions()}
        </>
      )}
    </Dialog>
  );
};

export default DialogModal;
