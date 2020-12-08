import React, { Component } from 'react'
import { connect } from "react-redux";
import MemberList from './memberList';
import Conversation from './conversation';
import GroupList from './groupList';
import {test} from '../../api';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class ChatView extends Component {

    constructor(props) {
        super(props);
        this.state={
            activeTab:0
        }
        this.conRef = React.createRef();
    }

    toggleTab = (tab)=>{
        this.setState({
            activeTab: tab
        });
    }

    componentDidMount(){ // mounted
        // console.log(this.props);
        test(this.processTest);
        test();
    }
    componentDidUpdate(){ //update
        test();
    }
    processTest = data=>{
        console.log(data);
    }
        
    render() {
        return (
            <main className="max-w-2xl mx-auto sm:mt-20 bg-white flex sm:h-96 h-screen overflow-hidden">
                <div className=" w-1/3 h-full">
                    <div className="tabs flex justify-center sm:flex-row flex-col border-b-2 border-green-300">
                        <a className={`py-2 px-3  text-gray-700 ${this.state.activeTab==0?'border-b-4 font-bold text-green-500 border-green-300':null}`} href="#" onClick={()=>this.toggleTab(0)} >Members</a>
                        <a className={`py-2 px-3  text-gray-700 ${this.state.activeTab==1?'border-b-4 font-bold text-green-500 border-green-300':null}`} href="#" onClick={()=>this.toggleTab(1)} >Groups</a>
                    </div>
                    <div className="h-full">
                        {this.state.activeTab==0?(<MemberList/>):(<GroupList/>)}
                    </div>
                    
                </div>
                <div className="w-3/4">
                   <Conversation/>
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
  )(ChatView);
  