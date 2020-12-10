import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {loginUserAction} from '../../redux/actions/authActions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            error: '',
            loading: false,
        }
        if(this.props.auth.user && this.props.auth.user.id){
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(next){
        this.setState({loading: false})
        if(next.auth.user && next.auth.user.id){
            this.props.history.push('/');
        }

        if(next.auth.error && next.auth.error.length>0){
            console.log('error: ',next.auth.error)
            this.setState({error: next.auth.error})
        }
    }
    componentDidMount(){
        // console.log(this.props);
    }

    handleFormSubmit = e=>{
        e.preventDefault();
        var {username,password} = this.state;
        this.setState({loading: true,error: ''})
        this.props.loginUserAction({username,password})
    }

    handleInputChange = e=>{
        this.setState({[e.target.name]: e.target.value})
    }
        
    render() {
        return (
            <main className=" text-white text-center sm:max-w-sm mx-auto bg-green-500 sm:h-96 h-screen sm:mt-20 overflow-hidden">
            {/* <!-- content wrapper --> */}
            <div className="p-4 flex justify-center items-center h-full">
               
                <form onSubmit={this.handleFormSubmit} className="mb-4" action="/" method="post">
                    <h2 className="text-2xl font-bold mb-4">Member Login</h2>
                    {/* <div className="flex flex-col mb-4 md:w-1/2">
                        <label className="mb-2 uppercase tracking-wide font-bold text-lg " htmlFor="first_name">First Name</label>
                        <input className="border py-2 px-3  md:mr-2" type="text" name="first_name" id="first_name"/>
                    </div>
                    <div className="flex flex-col mb-4 md:w-1/2">
                        <label className="mb-2 uppercase font-bold text-lg  md:ml-2" htmlFor="last_name">Last Name</label>
                        <input className="border py-2 px-3  md:ml-2" type="text" name="last_name" id="last_name"/>
                    </div> */}
                    <div className="flex flex-col w-lg mb-5">
                        <label className="mb-2 text-left uppercase font-semibold " htmlFor="username">Username</label>
                        <input onChange={this.handleInputChange} value={this.state.username} required className="py-1 focus:shadow-xl inline w-60 text-gray-700 px-2 " type="username" name="username" id="username"/>
                    </div>

                    <div className="flex flex-col w-lg mb-6">
                        <label className="mb-2 text-left uppercase font-semibold " htmlFor="password">Password</label>
                        <input onChange={this.handleInputChange} value={this.state.password} required className="py-1 focus:shadow-xl inline w-60 text-gray-700 px-2 " type="password" name="password" id="password"/>
                    </div>
                    <div className="flex justify-between items-baseline">
                        
                        {
                            this.state.loading?(
                                <button className="font-bold mb-4  mr-1 bg-green-300 text-white text-md py-1 px-3 hover:shadow-xl" disabled>wait</button>
                            ):(
                                <button className="font-bold mb-4 mr-1 bg-green-300 text-white text-md py-1 px-3 hover:shadow-xl" type="submit">Login</button>
                            )
        
                        }
                        <span className="text-xs">Haven't registed yet <Link className="text-green-200" to="/register">Sigup here</Link></span>
                    </div>
                    {
                        this.state.error.length>0?
                        (<span className="font-semibold">*{this.state.error}</span>):null
                    
                    }
                    

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
    { loginUserAction }
  )(Login);
  
