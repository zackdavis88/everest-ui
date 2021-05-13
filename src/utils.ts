import {initializeStore} from "./store/store";

// This is a hack to detect if we are calling getServerSideProps on the server.
// For some reason getServerSideProps is called everytime a page loads even if its
// reached via client-side navigation O_o which is pretty shitty naming on nextJS's part.
// ...should I consider another framework that handles serverside rendering?
export const isServerReq = req => !req.url.startsWith('/_next');

export const getAuthToken = async context => {
  if(isServerReq(context.req)){
    const reduxStore = initializeStore();
    await reduxStore.dispatch({
      type: "DEBUG"
    });
    return {
      props: {
        initialReduxState: reduxStore.getState()
      }
    };
  }
  return {props: {}};
};
