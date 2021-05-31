import { connect } from "react-redux";
import { NotificationProps } from "./Notification.props";
import { RootState } from "../../store/store";
import { hideNotification } from "../../store/actions/notification";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "./Notification.styles";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const Notification = (props: NotificationProps) => {
  const classes = useStyles(props);
  const router = useRouter();
  const closeButtonRef = useRef();
  const getStylesForType = (type: string) => {
    switch(type.toLowerCase()){
      case "info":
        return classes.info;
      case "error":
        return classes.error;
      case "warning":
        return classes.warning;
      case "success":
        return classes.success;
      default:
        return classes.info;
    }
  };
  // Listen for route changes, auto-close notifications on change.
  useEffect(() => {
    const handleRouteChange = (url) => {
      props.hideNotification();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const closeButton: {focus?: any} = closeButtonRef.current || {};
    if(!!props.message && closeButton.focus)
      closeButton.focus();
  }, [props.message])
  return (
    <Collapse in={!!props.message}>
      <Container maxWidth="md" className={classes.container}>
        <Box borderRadius="5px" boxShadow={3} className={`${classes.box} ${getStylesForType(props.type)}`}>
          <Typography variant="subtitle1" component="span">
            {props.message}
          </Typography>
          <IconButton ref={closeButtonRef} className={classes.close} onClick={() => props.hideNotification()}>
            <FontAwesomeIcon icon={faTimes} fixedWidth/>
          </IconButton>
        </Box>
      </Container>
    </Collapse>
  );
};

export default connect((state: RootState) => ({
  message: state.notification.message,
  type: state.notification.type,
  autoClose: state.notification.autoClose
}), {
  hideNotification
})(Notification);
