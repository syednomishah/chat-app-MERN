import React, { Component } from 'react'
import { connect } from "react-redux";
import MemberList from './memberList';
import Conversation from './conversation';
import GroupList from './groupList';
import Brodcast from './brodcast';
import {test,login,members, chatHistory,brodcastMessage, newMessage, groups, newGroupMessage, groupChatHistory} from '../../api';
import TopNav from '../chat/topNav';

class ChatView extends Component {

    constructor(props) {
        super(props);
        this.state={
            activeTab:0,
            members: [],
            groups:[],
            currentMember: null,
            currentGroup: null,
            chatHistory: [],
            groupHistory:[],
            update: true,
            modalLoading: false
        }
        this.conRef = React.createRef();
    }

    toggleTab = (tab)=>{
        this.setState({
            activeTab: tab
        });
    }

    componentWillReceiveProps(next){
        // members(this.processMembers);
        // groups(this.processGroups);
        
    }
    componentDidMount(){ // mounted
        // console.log(this.props);
        login(this.processLogin);
        members(this.processMembers);
        groups(this.processGroups);
        groupChatHistory(this.processGroupChatHistory);
        chatHistory(this.processChatHistory);
        brodcastMessage(this.processBrodcastMessage);
        newGroupMessage(this.processNewGroupMessage);
        newMessage(this.processNewMessage);
        // test(this.processTest);
        
        // var user = this.props.auth.user;
    }

    processBrodcastMessage = data=>{
        this.setState({modalLoading: false})
        if(data.success){
            var element = document.getElementById("groupModel");
            element.classList.add("hidden");
        }
 
        
    }
    handleGroupMessage = data=>{
        this.setState({modalLoading: true});
        brodcastMessage(data);
    }

    // componentDidUpdate(){ //update
    //     test();
    // }
    processTest = data=>{
        console.log(data);
    }
    processLogin = data=>{
       if(data.auth){
           // protected calls here
           members();
           groups();
           test();
       }
    }

    processMembers = members=>{
        
        this.setState({members,update: !this.state.update});
    }
    processGroups = groups=>{
        this.setState({groups,update: !this.state.update})
    }
    processChatHistory = chatHistory=>{
        // console.log(chatHistory);
        this.setState({chatHistory});
    }
    processGroupChatHistory = data=>{
        // console.log(data);
        this.setState({groupHistory: data});
    }

    handleMemberChange = member=>{
        var data = {receiverId: member.id};
        this.setState({member: member,group:null,chatHistory:[],groupHistory:[]});
        // console.log(data);
        chatHistory(data);
    }

    handleGroupChange = group=>{
        var data = {groupId: group.id};
        this.setState({member: null, group, chatHistory:[],groupHistory:[]});
        // console.log(data);
        groupChatHistory(data);
    }
    processNewGroupMessage = message=>{
        if(this.state.group && this.state.group.id==message.GroupId){
            var groupHistory = this.state.groupHistory;
            groupHistory.push(message);
            this.setState({groupHistory,update: !this.state.update});
        }
    }
    processNewMessage=message=>{
        var chatHistory = this.state.chatHistory
        // if(message.receiverId==this.props.auth.user.id){
            chatHistory.push(message);
            this.setState({chatHistory,update: !this.state.update});
        // }
    }

    handleMessage = message=>{
        console.log(message);
        if(this.state.member){
            message['senderId'] = this.props.auth.user.id;
            message['receiverId'] = this.state.member.id;
            // console.log(message);


            newMessage(message);
            message['createdAt'] = new Date();
            var chatHistory = this.state.chatHistory;
            
            chatHistory.push(message);
            this.setState({chatHistory,update: !this.state.update})
        }else if(this.state.group){
            message['GroupId'] = this.state.group.id;

            newGroupMessage(message);
            // message['createdAt'] = new Date();

            // var chatHistory = this.state.chatHistory;
            
            // chatHistory.push(message);
            // this.setState({chatHistory,update: !this.state.update})
        }else{
            this.setState({member: null,group:null})
        }
        
    }
        
    render() {
        return (
            
            <main className="max-w-2xl mx-auto sm:mt-20 bg-white flex flex-col sm:h-96 h-screen overflow-hidden">
                <TopNav name={this.state.member?this.state.member.username:this.state.group?this.state.group.name:''} />
                <div className="flex overflow-hidden h-full">
                    <div className=" w-1/3 h-full">
                        <div className="tabs flex justify-center sm:flex-row flex-col border-b-2 border-green-300">
                            <a className={`py-2 px-3  text-gray-700 ${this.state.activeTab==0?'border-b-4 font-bold text-green-500 border-green-300':null}`} href="#" onClick={()=>this.toggleTab(0)} >Members</a>
                            <a className={`py-2 px-3  text-gray-700 ${this.state.activeTab==1?'border-b-4 font-bold text-green-500 border-green-300':null}`} href="#" onClick={()=>this.toggleTab(1)} >Groups</a>
                        </div>
                        <div className="h-full">
                            {this.state.activeTab==0?(
                                <MemberList update={this.state.update} handleMemberChange={this.handleMemberChange} members={this.state.members} />
                            ):(<GroupList update={this.state.update} handleGroupChange={this.handleGroupChange} groups={this.state.groups} />)}
                        </div>
                        
                    </div>
                    <div className="w-3/4 h-full">
                        <Conversation 
                            update={this.state.update} 
                            handleMessage={this.handleMessage} 
                            member={this.state.member} 
                            group={this.state.group} 
                            chatHistory={this.state.chatHistory} 
                            groupHistory={this.state.groupHistory}

                        />
                    </div>
                </div>
                <Brodcast loading={this.state.modalLoading} handleMessage={this.handleGroupMessage} />
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
  