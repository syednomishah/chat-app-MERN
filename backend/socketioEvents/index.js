const chat = require('./chat');
var db = require('../models');

exports = module.exports = function({io,socket}){
    function setMember(set){ // set{id,name,company,email,auth,username,isadmin,groupids}
		if(!socket) return Log("no socket to set member settings on");
		if(!set || typeof set != "object") set = {};
		// set socket var with:					set data			 (or if none)		its own data			or default
		socket.member_id		=(set.id		)?parseInt(set.id)  :((socket.member_id		)?socket.member_id			: 0		);
		socket.member_name		=(set.name		)?set.name		    :((socket.member_name	)?socket.member_name	: ""	);

	}
    function Emit(socket,type,data){//Emit to single instance of one client
        
        socket.emit(type,data);
    }
    function EmitTo(id,type,data){//Emit to all instances of one client
        var sox = io.sockets.sockets;
        //var clientid = socket.member_id;
        Object.keys(sox).forEach(function(socketID){
            var socket = sox[socketID];
            if(parseInt(socket.member_id) === parseInt(id)){
                Emit(socket,type,data);
            }
        });
    }
    function EmitAll(type,data){ //Emit to all instances of all clients
        var sox = io.sockets.sockets;
        Object.keys(sox).forEach(function(socketID){
            //console.log(socketID)
            var socket = sox[socketID];
            //console.log(socket.member_name)
            Emit(socket,type,data);
        });
    }

    Emit(socket,'getLogin',{});


    socket.on('login',data=>{
        db.User.findOne({
            where: {username: data.username}
          }).then(user=>{
            
            setMember({id: user.id, name: user.username});
            Emit(socket,'login',{auth: true});
            chat({socket,Emit,EmitAll,EmitTo});
          });
    })
   

};
