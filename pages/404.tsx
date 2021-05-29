import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "2rem"
  },
  title: {
    padding: "12px 0",
    letterSpacing: "0.25rem"
  },
  subtitle: {
    margin: "20px"
  },
  button: {
    fontWeight: "bold"
  }
}));

export default function Custom404() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h2" component="div" className={classes.title} style={{fontWeight: "bold"}}>
        404
      </Typography>
      <Divider />
      <Typography variant="h2" component="div" className={classes.title}>
        Page Not Found
      </Typography>
      <Typography variant="h5" component="div" className={classes.subtitle}>
        Oh no! It looks like the requested page does not exist, use your browser or the button below to get back to Everest.
      </Typography>
      <Button component="a" href="/" variant="contained" color="primary" className={classes.button} size="large" startIcon={<FontAwesomeIcon icon={faHandPointLeft} fixedWidth/>}>
        Back to Everest
      </Button>
    </Container>
  )
};
