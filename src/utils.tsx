import { initializeStore, RootState } from "./store/store";
import cookie from "cookie";
import apiConfig from "../config/api.json";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { showNotification } from "./store/actions/notification";

// This is a hack to detect if we are calling getServerSideProps on the server.
// For some reason getServerSideProps is called everytime a page loads even if its
// reached via client-side navigation O_o which is pretty shitty naming on nextJS's part.
// ...should I consider another framework that handles serverside rendering?
export const isServerReq = req => !req.url.startsWith('/_next');

export const getAuthToken = async context => {
  // If this is a client side request, return no initial props.
  if(!isServerReq(context.req))
    return {props: {}};

  const cookies = cookie.parse(context.req.headers.cookie || "");
  const reduxStore = initializeStore();
  if(cookies.token){
    const res = await fetch(`${apiConfig.host}:${apiConfig.port}/auth/token`, {headers: {"x-everest-token": cookies.token}});
    const body = await res.json();
    if(res.status === 200){
      await reduxStore.dispatch({
        type: "TOKEN_SUCCESS",
        response: {body, headers: {"x-everest-token": cookies.token}}
      });
    }
  }
  return {
    props: {
      initialReduxState: reduxStore.getState()
    }
  };
};

export const ssrBlueprintsIndex = async context => {
  if(!isServerReq(context.req))
    return {props: {}};
  
  const cookies = cookie.parse(context.req.headers.cookie || "");
  const reduxStore = initializeStore();
  if(cookies.token){
    const authRes = await fetch(`${apiConfig.host}:${apiConfig.port}/auth/token`, {headers: {"x-everest-token": cookies.token}});
    const authBody = await authRes.json();
    if(authRes.status === 200){
      await reduxStore.dispatch({
        type: "TOKEN_SUCCESS",
        response: {body: authBody, headers: {"x-everest-token": cookies.token}}
      });

      const itemsPerPage = context.query.itemsPerPage || 10;
      const page = context.query.page || 1;
      const filterName = context.query.filterName;
      let url = `${apiConfig.host}:${apiConfig.port}/blueprints?itemsPerPage=${itemsPerPage}&page=${page}`;
      if(filterName)
        url = `${url}&filterName=${filterName}`;
      const blueprintsRes = await fetch(url, {headers: {"x-everest-token": cookies.token}});
      const blueprintBody = await blueprintsRes.json();
      if(blueprintsRes.status === 200){
        await reduxStore.dispatch({
          type: "BLUEPRINT_SUCCESS",
          response: {body: blueprintBody}
        });
      }
      else{
        await reduxStore.dispatch({
          type: "BLUEPRINT_FAILURE",
          response: {body: blueprintBody}
        });
        await reduxStore.dispatch({
          type: "SHOW_NOTIFICATION",
          notification: {message: blueprintBody.error, type: "error"}
        });
      }
    }
  }
  return {
    props: {
      initialReduxState: reduxStore.getState()
    }
  };
};

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
 export const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
};

export const requireAuth = (PageComponent) => {
  interface AuthControllerProps{
    initialReduxState?: RootState;
    token?: string;
    showNotification: (message: string, type?: string, autoClose?: boolean) => void;
  };

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      padding: "25px",
      color: theme.palette.common.black,
      textAlign: "center"
    },
    text: {
      width: "100%",
      fontWeight: "bold"
    },
    marginTop: {
      margin: "25px 0 0 0"
    }
  }));

  const AuthController = (props: AuthControllerProps) => {
    const router = useRouter();
    const classes = useStyles();
    const token = props.token;
    useEffect(() => {
      if(!token){
        router.push(`/?redirectUrl=${router.pathname}`).then(() => {
          const message = "Please login below to use Everest."
          props.showNotification(message)
        });
      }
    }, [token]);
    return (
      <>
        {!token ? (
          <Backdrop className={classes.backdrop} open={true}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body1" component="div" className={classes.text}>
                  Redirecting to Login Page...
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.marginTop}>
                <CircularProgress />
              </Grid>
            </Grid>
          </Backdrop>
        ) : (
          <PageComponent initialReduxState={props.initialReduxState} />
        )}
      </>
    );
  };
  return connect((state: RootState) => ({
    token: state.auth.token
  }), {
    showNotification
  })(AuthController);
};

const monthAbbreviations = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export const formatDate = (timestampString) => {
  const timestamp = new Date(timestampString);
  if(timestamp.toString() === "Invalid Date")
    return "Invalid Date";
  const monthName = monthAbbreviations[timestamp.getMonth()];
  const dayNumber = timestamp.getDate();
  const fullYear = timestamp.getFullYear();
  return `${monthName} ${dayNumber}, ${fullYear}`;
};