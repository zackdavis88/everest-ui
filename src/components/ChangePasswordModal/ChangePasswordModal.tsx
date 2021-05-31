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
import { useStyles } from "./ChangePasswordModal.styles";
import { ChangePasswordModalProps } from "./ChangePasswordModal.props";

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
  const classes = useStyles(props);
  return (
    <Dialog onClose={props.handleClose} aria-labelledby="change-password-modal" open={props.isOpen} maxWidth="sm" fullWidth>
      <DialogTitle id="change-password-modal" disableTypography className={classes.dialogTitle}>
        <Typography variant="h6" component="span">
          Change Password
        </Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
          <FontAwesomeIcon icon={faTimes} fixedWidth />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <TextField variant="filled" fullWidth id="current-password-input" required type="password" label="Current Password"/>
        <TextField variant="filled" fullWidth id="new-password-input" required type="password" label="New Password"/>
        <TextField variant="filled" fullWidth id="confirm-password-input" required type="password" label="Confirm Password"/>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button autoFocus variant="contained" onClick={props.handleClose} color="primary" fullWidth size="large">
          Submit
        </Button>
        <Button variant="outlined" onClick={props.handleClose} color="primary" fullWidth size="large">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
