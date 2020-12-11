import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class GroupList extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        // console.log(this.props);
    }
        
    render() {
        // console.log(this.props.update);
        return (
            <section className="h-full flex flex-col text-gray-700">
               
                 <ul className="p-2 overflow-y-scroll h-3/4">
                    {
                        this.props.groups.map((group,ind)=>{
                            return (
                                <li key={ind} onClick={()=>this.props.handleGroupChange(group)} className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                                    <a href="#" >{group.name}</a>
                                </li>
                            );
                        })
                    }
                    
                    
                </ul>
                <div className="mt-1 px-3 sm:pt-0 pt-2  h-1/5">
                    <Link to="/group" className="text-center py-2 block mx-auto bg-green-300 font-bold hover:shadow-md text-sm bg-gray-50  transition ease-in duration-150">+ New Group</Link>
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
  )(GroupList);
  