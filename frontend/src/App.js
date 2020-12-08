import React,{Component} from 'react';
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUserAction } from "./redux/actions/authActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';
import {connect} from 'react-redux'
import Login from './components/user/login';
import Register from './components/user/register';
import ChatView from './components/chat/chatView';
import store from "./redux/store";


if (localStorage.jwtToken) {
 
  if(localStorage.jwtToken){
    const decoded = jwt_decode(localStorage.jwtToken);
    if(decoded){
      store.dispatch(setCurrentUser(decoded));
      // window.location.href="/";
    }
  }
  

  
  
}
class App extends Component {
  
  render(){
    var loginUser = this.props.user && this.props.user.id?true:false;
    return (
      <div className="app">

        <Router>
          <Switch>
            <AuthRoute
              path="/"
              exact
              authUser={loginUser}
              component={ChatView}
            />
            <Route
              path="/login"
              exact
              component={Login}
            />
            <Route
              path="/register"
              exact
              component={Register}
            />
        
          </Switch>
        </Router>
      </div>
    );
  }
  
}

const AuthRoute = ({component: Component, authUser, ...rest }) => {
  // console.log(authUser)
  return (
    <Route
      {...rest}
      render={props =>{
			  if(authUser){
          // user is logged in
				  return <Component {...props} />
			  }else{
          // return login component here
				  window.location.href='/login';
			  }
			 }
      }
    />
  );
}

const mapStateToProps = ({auth}) => {
  return {
    user: auth.user
  };
};
export default connect(
  mapStateToProps,
  {  }
)(App);
