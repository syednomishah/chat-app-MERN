import React, { Component } from 'react'
import { connect } from "react-redux";
import CreateMessage from "./createMessage";
import {login, brodcastMessage, members} from '../../api';

class CreateGroup extends Component {

    constructor(props) {
        super(props);
        this.state={
            members: [],
            groupMembers:[],
            message: '',
            loading: false
        }
        this.conRef = React.createRef();
    }

    componentWillReceiveProps(next){
        if(next.loading)
            this.setState({loading: next.loading})
    }
    componentDidMount(){ // mounted
        this.setState({loading: this.props.loading})
        
    }

    


    

    
    handleChange = e=>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e=>{
        e.preventDefault();
        var {message} = this.state;
        message.trim();
        if(message.length>0){
            var data = {message};
            // console.log(data);
            // console.log(data);
            this.props.handleMessage(data);
            this.setState({message: ''})
        }
    }

    handleClose=()=>{
        var element = document.getElementById("groupModel");
        element.classList.add("hidden");
    }
        
    render() {
        // console.log(this.props.update)
        // console.log(this.state.groupMembers)
        var currentUser = this.props.auth.user && this.props.auth.user.id?this.props.auth.user:{};
        
        return (
            
            <section style={{left: '40%'}} id="groupModel" className={`max-w-full hidden absolute sm:max-w-md mx-auto  sm:mt-20 p-3 border-white border-4 shadow-2xl bg-green-500 flex flex-col  py-10 overflow-hidden`}>
                <button className="text-white py-1 px-2 rounded-bl-xl bg-red-500 absolute right-0 top-0" onClick={this.handleClose}>close</button>
               <div className="text-center text-white font-bold  py-2 mb-5">
                   <h2>Broadcast message to all members</h2>
               </div>
                
                <form onSubmit={this.handleSubmit} className="flex">
                    <div className="w-4/5">
                        <input onChange={this.handleChange} required value={this.state.message} name="message" className="w-full border-4 p-2 border-green-500" type="text" placeholder="type message here..."/> 
                    </div>
                    <div className="flex-grow mt-1 mr-1 text-center">
                        <button className="cursor-pointer w-full  bg-green-300 p-2 flex justify-center items-baseline">
                            <span>
                               {
                                   this.props.loading?'processing':'Send'
                               }
                            </span>

                        </button>
                    </div>
                </form>
                
    
                 
            </section>
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
    {  }
  )(CreateGroup);
  