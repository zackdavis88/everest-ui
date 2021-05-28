import {useTheme, useMediaQuery} from "@material-ui/core";
import {initializeStore} from "./store/store";
import cookie from "cookie";

// This is a hack to detect if we are calling getServerSideProps on the server.
// For some reason getServerSideProps is called everytime a page loads even if its
// reached via client-side navigation O_o which is pretty shitty naming on nextJS's part.
// ...should I consider another framework that handles serverside rendering?
export const isServerReq = req => !req.url.startsWith('/_next');


// TODO: THis is where you left off. Made good progress and are successfully authenticating and populating the initalStore.
// Refine this and make sure the success / failure flows are working. Keep going from there.
export const getAuthToken = async context => {
  if(isServerReq(context.req)){
    const cookies = cookie.parse(context.req.headers.cookie);
    const reduxStore = initializeStore();
    const res = await fetch(`http://localhost:3333/auth/token`, {headers: {"x-everest-token": cookies.token}});
    const body = await res.json();
    reduxStore.dispatch({
      type: "TOKEN_SUCCESS",
      response: { body, headers: {"x-everest-token": cookies.token} }
    });
    return {
      props: {
        initialReduxState: reduxStore.getState()
      }
    };
  }
  return {props: {}};
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
