import { TOKEN_FAILURE } from "./actions/auth";
export const apiMiddleware = store => next => action => {
  if(!action.types || !Array.isArray(action.types) || action.types.length !== 3)
    return next(action); // bail out of this middleware function if we dont have action.types with 3 types.

  const {types, reqUrl, reqOptions, payload} = action;
  let options = reqOptions ? {...reqOptions} : {};
  const [REQUEST_TYPE, SUCCESS_TYPE, FAILURE_TYPE] = types;
  const authToken = store.getState().auth.token;
  if(authToken){
    // request.set("x-everest-token", authToken);
    options = {
      ...options,
      headers: {
        ...options.headers,
        "x-everest-token": authToken
      }
    };
  }
  
  if(payload){
    // request.send(payload);
    options = {
      ...options,
      body: JSON.stringify(payload)
    }
  }
  
  let headers = {};
  let hasTokenError = false;
  let hasError = false;
  store.dispatch({type: REQUEST_TYPE});
  return fetch(reqUrl, options).then(res => {
    if(res.status !== 200)
      hasError = true;
    
    if(res.status === 403)
      hasTokenError = true;
    const token = res.headers.get("x-everest-token");
    if(token)
      headers = {"x-everest-token": token};
    return res.json();
  }).then(jsonBody => {
    if(hasTokenError){
      store.dispatch({type: TOKEN_FAILURE});
      return jsonBody;
    }
    else if(hasError){
      store.dispatch({type: FAILURE_TYPE, error: jsonBody});
      return jsonBody;
    }
    else{
      store.dispatch({type: SUCCESS_TYPE, response: { body: jsonBody, headers: headers}});
      return jsonBody;
    }
  });
};
