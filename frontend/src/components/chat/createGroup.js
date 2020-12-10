import React, { Component } from 'react'
import { connect } from "react-redux";
import CreateMessage from "./createMessage";
import {login, newGroup, members} from '../../api';

class CreateGroup extends Component {

    constructor(props) {
        super(props);
        this.state={
            members: [],
            groupMembers:[],
            name: '',
            loading: false
        }
        this.conRef = React.createRef();
    }
    componentDidMount(){ // mounted
        // console.log(this.props);
        login(this.processLogin);
        members(this.processMembers);
        
        newGroup(this.processNewGroup);
        // test(this.processTest);
        
    }

    processNewGroup = data=>{
        if(data.success)
            this.props.history.push('/');
    }


    processLogin = data=>{
       if(data.auth){
           // protected calls here
           members();
           }
    }

    processMembers = members=>{
        this.setState({members});
    }

    handleChange = e=>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleCheckbox = e=>{
        var groupMembers = this.state.groupMembers;
        var userId = e.target.name;
        var checked = e.target.checked;
        if(checked){
            var member = this.state.members.filter(user=>user.id==userId)[0];
            groupMembers.push(member.id);
        }else{
            groupMembers = groupMembers.filter(id=>id!=userId)
        }
        this.setState({groupMembers})
    }

    handleGroupSubmit = e=>{
        e.preventDefault();
        var {name,groupMembers} = this.state;
        name.trim();
        if(name.length>0 && groupMembers.length>0){
            this.setState({loading: true})
            var data = {name,groupMembers};
            // console.log(data);
            newGroup(data);
        }
    }
        
    render() {
        // console.log(this.props.update)
        // console.log(this.state.groupMembers)
        var currentUser = this.props.auth.user && this.props.auth.user.id?this.props.auth.user:{};
        
        return (
            <section className="max-w-md mx-auto sm:mt-20 p-3 bg-green-500 flex flex-col sm:h-96 h-screen overflow-hidden">
               <div className="text-center text-white font-bold  py-2">
                   <h2>Select Members</h2>
               </div>
                <ul ref={this.conRef} className="h-full ml-1 px-2 overflow-y-scroll">
                    
                    {
                        this.state.members.map((user,index)=>{
                            
                            return (

                                <div key={index} className="px-4 hover:shadow-lg flex justify-between bg-green-300  hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                                    <span className={`font-bold text-gray-600`}>
                                        {user.username}
                                    </span> 
                                    <input type="checkbox" className="mt-1 cursor-pointer" name={user.id} onClick={this.handleCheckbox} />                                   
                                </div>
                            )
                            
                        })
                    }
                    
                    
                </ul>
                
                <form onSubmit={this.handleGroupSubmit} className="flex">
                    <div className="w-4/5">
                        <input onChange={this.handleChange} required value={this.state.name} name="name" className="w-full border-4 p-2 border-green-500" type="text" placeholder="Group Name"/> 
                    </div>
                    <div className="flex-grow mt-1 mr-1 text-center">
                        <button onClick={this.handleClick} className="cursor-pointer w-full block bg-green-300 p-2 flex justify-center items-baseline">
                            <span>
                               {
                                   this.state.loading?'processing':'Create'
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
  