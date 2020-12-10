import React, { Component } from 'react'
import { connect } from "react-redux";
import CreateMessage from "./createMessage";
import Moment from 'react-moment';

class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state={
            
        }
        this.conRef = React.createRef();
    }
    componentWillReceiveProps(next){
        // console.log(next);
    }
    componentDidUpdate() {
        // console.log(this.conRef);
        if(this.conRef && this.conRef.current){
            this.conRef.current.scrollTo(0,this.conRef.current.scrollHeight);
        }
        
      }


    componentDidMount(){
        // this.setState({
        //     member: this.props.member,
        //     group: this.props.group,
        //     chatHistory: this.props.chatHistory
        // })
        // console.log(this.props);
        // if (this._scrollBarRef) {
        //     this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
        //   }
    }
        
    render() {
        console.log(this.props.update)
        var currentUser = this.props.auth.user && this.props.auth.user.id?this.props.auth.user:{};
        
        return (
            <section className="h-full  bg-green-500 flex flex-col  p-0 text-gray-700">
                {
                    this.props.member || this.props.group?(
                        <>
                            <ul ref={this.conRef} className="h-full ml-1 py-4 px-2 overflow-y-scroll">
                                
                                {
                                    this.props.member && this.props.chatHistory.map((item,index)=>{
                                        var right = item.senderId==currentUser.id?true:false;
                                        // console.log(right);
                                        return (

                                            <div key={index} className={` mt-4 relative flex items-stretch ${right?'justify-end':'justify-start'} `}>

                                                    {right?null:<a href="#" className="px-1 rounded-l bg-green-300 py-2 text-gray-600 font-bold">{this.props.member.username}</a>}
                                                    <span className={`${right?'rounded-l':'rounded-r'} flex flex-col hover:shadow-md text-md cursor-pointer transition ease-in duration-150 py-2 px-2 bg-gray-100`}>
                                                        <span className="text">{item.message}</span>
                                                        <span className="text-xs"><Moment fromNow>{item.createdAt}</Moment></span>
                                                    </span>
                                                    {right?<a href="#" className="px-1 rounded-r py-2 text-gray-600 bg-green-300 font-bold ">{currentUser.username}</a>:null}

                                                
                                            </div>
                                        )
                                        
                                    })
                                }
                                
                                
                                {
                                    this.props.group && this.props.groupHistory.map((item,index)=>{
                                        var right = item.UserId==currentUser.id?true:false;
                                        // console.log(right);
                                        return (

                                            <div key={index} className={` mt-4 relative flex items-stretch ${right?'justify-end':'justify-start'} `}>

                                                    {right?null:<a href="#" className="px-1 rounded-l bg-green-300 py-2 text-gray-600 font-bold">{item.username}</a>}
                                                    <span className={`${right?'rounded-l':'rounded-r'} flex flex-col hover:shadow-md text-md cursor-pointer transition ease-in duration-150 py-2 px-2 bg-gray-100`}>
                                                        <span className="text">{item.message}</span>
                                                        <span className="text-xs"><Moment fromNow>{item.createdAt}</Moment></span>
                                                    </span>
                                                    {right?<a href="#" className="px-1 rounded-r py-2 text-gray-600 bg-green-300 font-bold ">{currentUser.username}</a>:null}

                                                
                                            </div>
                                        )
                                        
                                    })
                                }
                                
                                
                            </ul>
                            <div>
                                <CreateMessage handleMessage={this.props.handleMessage} />
                            </div>
                        </>
                    ):(
                        <div className="flex justify-center mt-5">
                            <h2 className="text-white font-bold text-xl px-2">Choose a member, Start chatting ....</h2>
                        </div>
                    )
                }
                
                 
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
  )(Conversation);
  