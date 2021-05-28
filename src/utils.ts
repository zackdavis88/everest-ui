import {useTheme, useMediaQuery} from "@material-ui/core";
import {initializeStore} from "./store/store";
import cookie from "cookie";
import apiConfig from "../config/api.json";

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
