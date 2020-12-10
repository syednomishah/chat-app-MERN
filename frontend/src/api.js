import dataSpew from 'socket.io-client';

import jwt_decode from 'jwt-decode';

const socket = dataSpew('http://localhost:5000');

// socket.on('getLogin',data=>{
//     console.log('getLogin received');
//     if(localStorage.jwtToken){
// 		const user = jwt_decode(localStorage.jwtToken);
// 		socket.emit('login',{username: user.username})
// 	}
// })

socket.on('disconnect',()=>{
    console.log('disconnected');
})



function login(cb){
	if(typeof cb === "function"){
        socket.off('login').on('login', cb);
        if(localStorage.jwtToken){
            const user = jwt_decode(localStorage.jwtToken);
            socket.emit('login',{username: user.username})
        }
        
	} else {
		socket.emit('login',cb);
	}
}

function test(cb){
	if(typeof cb === "function"){
		socket.off('test').on('test', cb);
	} else {
		socket.emit('test');
	}
}

function members(cb){
	if(typeof cb === "function"){
		socket.off('members').on('members', cb);
	} else {
		socket.emit('members');
	}
}
function chatHistory(cb){
	if(typeof cb === "function"){
		socket.off('chatHistory').on('chatHistory', cb);
	} else {
		socket.emit('chatHistory',cb);
	}
}

function newMessage(cb){
	if(typeof cb === "function"){
		socket.off('newMessage').on('newMessage', cb);
	} else {
		socket.emit('newMessage',cb);
	}
}
function newGroup(cb){
	if(typeof cb === "function"){
		socket.off('newGroup').on('newGroup', cb);
	} else {
		socket.emit('newGroup',cb);
	}
}

function groups(cb){
	if(typeof cb === "function"){
		socket.off('groups').on('groups', cb);
	} else {
		socket.emit('groups',cb);
	}
}
function groupChatHistory(cb){
	if(typeof cb === "function"){
		socket.off('groupChatHistory').on('groupChatHistory', cb);
	} else {
		socket.emit('groupChatHistory',cb);
	}
}
function newGroupMessage(cb){
	if(typeof cb === "function"){
		socket.off('newGroupMessage').on('newGroupMessage', cb);
	} else {
		socket.emit('newGroupMessage',cb);
	}
}

export {
    test, login, members, chatHistory, newMessage, newGroup, groups, groupChatHistory, newGroupMessage
};