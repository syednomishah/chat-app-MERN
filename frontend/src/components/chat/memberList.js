import React, { Component } from 'react'
import { connect } from "react-redux";

class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        // console.log(this.props);
    }
        
    render() {
        return (
            <section className="h-full flex flex-col text-gray-700">
               
                 <ul className="p-2 overflow-y-scroll h-3/4">
                    
                    <li className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                        <a href="#" >member 1</a>
                    </li>
                    <li className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                        <a href="#" >member 2</a>
                    </li>
                      
                    <li className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                        <a href="#" >member 3</a>
                    </li>   
                    <li className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                        <a href="#" >member 3</a>
                    </li>   
                    <li className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                        <a href="#" >member 3</a>
                    </li>   
                    <li className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                        <a href="#" >member 3</a>
                    </li>   
                    <li className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                        <a href="#" >member 3</a>
                    </li>   
                    <li className="px-4 hover:shadow-lg hover:text-md customListBorder text-sm py-2 mt-2 transition ease-in duration-150">
                        <a href="#" >member 3</a>
                    </li>   
                       
                     
                </ul>
                <div className="mt-1 px-3 sm:pt-0 pt-2  h-1/5">
                    <a className="text-center py-2 block mx-auto bg-green-300 font-bold hover:shadow-md text-sm bg-gray-50  transition ease-in duration-150" href="#">+ New Group</a>
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
  