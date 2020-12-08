import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Register extends Component {

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
            <main className=" text-white text-center sm:max-w-sm mx-auto bg-green-500 sm:h-96 h-screen sm:mt-20 overflow-hidden">
            {/* <!-- content wrapper --> */}
            <div className="p-4 flex justify-center items-center h-full">
               
                <form className="mb-4" action="/" method="post">
                    <h2 class="text-2xl font-bold mb-4">Member Signup</h2>
                    {/* <div className="flex flex-col mb-4 md:w-1/2">
                        <label className="mb-2 uppercase tracking-wide font-bold text-lg " for="first_name">First Name</label>
                        <input className="border py-2 px-3  md:mr-2" type="text" name="first_name" id="first_name"/>
                    </div>
                    <div className="flex flex-col mb-4 md:w-1/2">
                        <label className="mb-2 uppercase font-bold text-lg  md:ml-2" for="last_name">Last Name</label>
                        <input className="border py-2 px-3  md:ml-2" type="text" name="last_name" id="last_name"/>
                    </div> */}
                    <div className="flex flex-col w-lg mb-5">
                        <label className="mb-2 text-left uppercase font-semibold " for="username">Username</label>
                        <input required className="py-1 focus:shadow-xl inline w-60 text-gray-700 px-2 " type="username" name="username" id="username"/>
                    </div>
                    <div className="flex flex-col w-lg mb-6">
                        <label className="mb-2 text-left uppercase font-semibold " for="password">Password</label>
                        <input required className="py-1 focus:shadow-xl inline w-60 text-gray-700 px-2 " type="password" name="password" id="password"/>
                    </div>
                    <div class="flex justify-between items-baseline">
                        
                        <button className="font-bold mb-6 mr-1 bg-green-300 text-white text-md py-1 px-3 hover:shadow-xl" type="submit">Signup</button>
                        <span className="text-xs">Already registered <Link className="text-green-200" to="/login">Login here</Link></span>
                    </div>
                    

                </form>
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
    {  }
  )(Register);
  