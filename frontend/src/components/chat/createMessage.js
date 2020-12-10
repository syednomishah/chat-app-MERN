import React, { Component } from 'react'

export default class createMessage extends Component {
    constructor(props) {
        super(props);
        this.state={
           message: '',
        }
    }
    handleChange = e=>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleKeyDown = e=>{
        // console.log('here');
        if(e.key=='Enter'){
            var message = this.state.message;
            message = message.trim();
            if(message.length>0){
                this.props.handleMessage({message});
                this.setState({message: ''})
            }
        }
    }

    handleClick = ()=>{
        var message = this.state.message;
        message = message.trim();
        if(message.length>0){
            this.props.handleMessage({message});
            this.setState({message: ''})
        }
        
    }
    render() {
        return (
            <div className="flex">
                <div className="w-4/5">
                    <input onChange={this.handleChange} onKeyDown={this.handleKeyDown} value={this.state.message} name="message" className="w-full border-4 p-2 border-green-500" type="text" placeholder="type here ..."/>
                </div>
                <div className="flex-grow mt-1 mr-1 text-center">
                    <button  onClick={this.handleClick} className="cursor-pointer w-full block bg-green-300 p-2 flex justify-center items-baseline">
                        <span>
                            Send
                        </span>

                    </button>
                </div>
            </div>
            
        )
    }
}
