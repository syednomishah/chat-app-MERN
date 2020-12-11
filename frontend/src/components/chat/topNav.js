import React, { Component } from 'react'
import { connect } from "react-redux";
import {
    
    withRouter
  } from 'react-router-dom';
import {logoutUserAction} from '../../redux/actions/authActions';
class TopNav extends Component {

    constructor(props) {
        super(props);
        this.state={
            activeTab:0
        }
    }

    handleLogout = ()=>{
        this.props.logoutUserAction();
    }
    brodcastMessage=()=>{
        var element = document.getElementById("groupModel");
        element.classList.remove("hidden");
    }

    render() {
        return (
            
            <main className="flex justify-between border-b-2 border-green-300">
                    <div>
                        <h2 className="text-xl ml-4">{this.props.auth.user.username}</h2>
                    </div>
                    <div>
                        <span className="text-xl">{this.props.name || ''}</span>
                    </div>
                    <div>
                        
                        <button onClick={this.brodcastMessage} className=" py-1 px-2 bg-green-500 text-white font-bold mr-2" >brodcast</button>
                        <button onClick={this.handleLogout} className=" py-1 px-2 bg-red-500 text-white font-bold" >Logout</button>
                    </div>
                                
            </main>
        )
    }
}


const mapStateToProps = ({auth}) => {
    return {
      auth
    };
  };
  export default connect(
    mapStateToProps,
    { logoutUserAction }
  )(withRouter(TopNav));
  