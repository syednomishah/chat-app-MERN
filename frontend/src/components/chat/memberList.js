import React, { Component } from 'react'
import { connect } from "react-redux";

class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state={
            members: [],
            search: '',
        }
    }

    componentDidMount(){
        this.setState({members: this.props.members})
    }
    sortMembers = e=>{
        var members = this.props.members.filter(mem=>mem.username.includes(e.target.value));
        this.setState({search: e.target.value,members})

        
        
    }
        
    render() {
        // console.log(this.props.update);
        return (
            <section className="h-full flex flex-col text-gray-700">
               
                 <ul className="p-2 overflow-y-scroll h-3/4">
                    {
                        this.state.search.length>0 && this.state.members.map((member,index)=>{

                            return (
                                <li key={index} onClick={()=>this.props.handleMemberChange(member)} className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                                    <a href="#" >{member.username}</a>
                                </li>
                            );

                        })
                    }
                    {
                        this.state.search.length==0 && this.props.members.map((member,index)=>{

                            return (
                                <li key={index} onClick={()=>this.props.handleMemberChange(member)} className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                                    <a href="#" >{member.username}</a>
                                </li>
                            );

                        })
                    }
                    
                       
                     
                </ul>
                <div className=" px-3 sm:pt-0 pt-2 bg-white  h-1/5 mb-2">
                    <input onChange={this.sortMembers}  value={this.state.search} name="search" className="w-full border-4 px-2 border-green-300 " type="text" placeholder="search member"/>
                </div>
                
                
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
  )(MemberList);
  