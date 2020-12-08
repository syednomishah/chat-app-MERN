import React, { Component } from 'react'
import { connect } from "react-redux";
import CreateMessage from "./createMessage";
import PerfectScrollbar from "react-perfect-scrollbar";
import ScrollArea  from 'react-scrollbar';
class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidUpdate() {
        
        if (this._scrollBarRef) {
          this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
        }
      }

    componentDidMount(){
        // console.log(this.props);
        if (this._scrollBarRef) {
            this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
          }
    }
        
    render() {
        var currentUser = {username: 'nomi',id:1};
        var chat=[
            {userId: 1,username: 'nomi',message: 'hey!'},
            {userId: 2,username: 'saghar',message: 'hey! how you doing?'},
            {userId: 1,username: 'nomi',message: 'im goood how about you ?'},
            {userId: 2,username: 'saghar',message: 'just waiting for this pendemic to be over soon!'},
            {userId: 1,username: 'nomi',message: 'hey!'},
            {userId: 2,username: 'saghar',message: 'hey! how you doing?'},
            {userId: 1,username: 'nomi',message: 'im goood how about you ?'},
            {userId: 2,username: 'saghar',message: 'just waiting for this pendemic to be over soon!'},
            {userId: 1,username: 'nomi',message: 'hey!'},
            {userId: 2,username: 'saghar',message: 'hey! how you doing?'},
            {userId: 1,username: 'nomi',message: 'im goood how about you ?'},
            {userId: 2,username: 'saghar',message: 'just waiting for this pendemic to be over soon!'},
            {userId: 1,username: 'nomi',message: 'hey!'},
            {userId: 2,username: 'saghar',message: 'hey! how you doing?'},
            {userId: 1,username: 'nomi',message: 'im goood how about you ?'},
            {userId: 2,username: 'saghar',message: 'just waiting for this pendemic to be over soon!'},
        ]
        return (
            <section className="h-full  bg-green-500 flex flex-col p-0 text-gray-700">
                
                <ul className="h-full ml-1 py-4 px-2 overflow-y-scroll">
                {/* <button onClick={()=>{
                        this.props.parentRef.current.scrollTo(0,this.props.parentRef.current.scrollHeight);
                    }}>Clickme</button> */}
                    {
                        chat.map(item=>{
                            var right = item.userId==currentUser.id?true:false;
                            return (

                                <div className={` mt-4 relative flex items-baseline ${right?'justify-end':'justify-start'} `}>

                                        {right?null:<a href="#" className="px-1 rounded-l bg-green-300 py-2 text-gray-600 font-bold">{item.username}</a>}
                                        <span className={`${right?'rounded-l':'rounded-r'} hover:shadow-md text-md cursor-pointer transition ease-in duration-150 py-2 px-2 bg-gray-100`}>
                                            {item.message}
                                        </span>
                                        {right?<a href="#" className="px-1 rounded-r py-2 text-gray-600 bg-green-300 font-bold ">{item.username}</a>:null}

                                    
                                </div>
                            )
                            
                        })
                    }
                    
                    
                 </ul>
                 <div>
                    <CreateMessage />
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
  )(Conversation);
  