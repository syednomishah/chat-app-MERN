import axios from "axios";
import jwt_decode from "jwt-decode";
var serverUrl = 'http://localhost:5000';
const registerUserAction = (userData, history) => dispatch => {
  dispatch({ type: "SET_ERROR", payload: '' });
  axios
    .post(serverUrl+"/users/register", userData)
    .then(res => {
      var data = res.data
    
      if(data.success){
        localStorage.setItem('jwtToken',data.token);
        dispatch(setCurrentUser(data.user));
      }else{
        dispatch({ type: "SET_ERROR", payload: data.msg });
      }
    })
    .catch(err => {
      // dispatch({ type: "GET_ERRORS", payload: err.response.data });
      console.log('error: ',err.message)
      dispatch({ type: "SET_ERROR", payload: err.message });
    });
};

const loginUserAction = userData => dispatch => {
  axios
    .post(serverUrl+"/users/login", userData)
    .then(res => {
      var data = res.data
    
      if(data.success){
        localStorage.setItem('jwtToken',data.token);
        dispatch(setCurrentUser(data.user));
      }else{
        dispatch({ type: "SET_ERROR", payload: data.msg });
      }
    })
    .catch(err => {
      console.log('error: ',err.message)
      dispatch({ type: "SET_ERROR", payload: err.message });
    });
};

const logoutUserAction = history => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch(setCurrentUser(false));
};

function setCurrentUser(decoded) {
  return { type: "SET_CURRENT_USER", payload: decoded };
}
export { registerUserAction, loginUserAction, setCurrentUser, logoutUserAction };
