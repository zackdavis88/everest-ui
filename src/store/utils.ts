export const apiMiddleware = store => next => action => {
  if(!action.types || !Array.isArray(action.types) || action.types.length !== 3)
    return next(action); // bail out of this middleware function if we dont have action.types with 3 types.

  const {types, request, payload} = action;
  const [REQUEST_TYPE, SUCCESS_TYPE, FAILURE_TYPE] = types;
  const authToken = store.getState().auth.token;
  if(authToken)
    request.set("x-everest-token", authToken);
  
  if(payload)
    request.send(payload);
  
  store.dispatch({type: REQUEST_TYPE});
  return request.then(response => {
    store.dispatch({type: SUCCESS_TYPE, response});
    return response.body;
  })
  .catch(error => {
    store.dispatch({type: FAILURE_TYPE, error});

    return error.response && error.response.body;
  });
};
