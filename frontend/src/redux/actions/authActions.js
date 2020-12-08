import axios from "axios";
import jwt_decode from "jwt-decode";
const registerUserAction = (userData, history) => dispatch => {
  axios
    .post("/users/register", userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      dispatch({ type: "GET_ERRORS", payload: err.response.data });
    });
};

const loginUserAction = userData => dispatch => {
  axios
    .post("/users/login", userData)
    .then(res => {
      const { token } = res.data;
      //set token to localstorage
      localStorage.setItem("jwtToken", token);
      //set auth
      setAuthToken(token);
      // decode the token for user data
      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({ type: "GET_ERRORS", payload: err.response.data });
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
