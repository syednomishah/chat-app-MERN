import React,{Component} from 'react';
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUserAction } from "./redux/actions/authActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
  // Redirect
} from 'react-router-dom';
import {connect} from 'react-redux'
import Login from './components/user/login';
import Register from './components/user/register';
import ChatView from './components/chat/chatView';
import NewGroup from './components/chat/createGroup';
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
    // console.log(this.props);
    return (
      <div className="app">

          <Switch>
            <AuthRoute
              path="/"
              exact
              history={this.props.history}
              authUser={loginUser}
              component={ChatView}
            />
            <AuthRoute
              path="/group"
              exact
              history={this.props.history}
              authUser={loginUser}
              component={NewGroup}
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
      </div>
    );
  }
  
}

const AuthRoute = ({component: Component,history, authUser, ...rest }) => {
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
				  history.push('/login');
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
)(withRouter(App));
