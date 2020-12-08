import React,{Component} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';
import Login from './components/user/login';
import Register from './components/user/register';
import ChatView from './components/chat/chatView';
class App extends Component {
  
  render(){
    var loginUser = true;
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

  return (
    <Route
      {...rest}
      render={props =>{
			  if(authUser){
          // user is logged in
				  return <Component {...props} />
			  }else{
          // return login component here
				  window.location.href='/';
			  }
			 }
      }
    />
  );
}

export default App;
