
var db = require('../models');
var Sequelize = 
exports = module.exports = function({socket,Emit,EmitAll,EmitTo}){
    socket.on('test', data=> {
        // console.log('here   ======>',socket.member_name);
    });

    socket.on('members', data=> {
        db.User.findAll().then(members=>{
            members = toJson(members);
            members = members.filter(member=>member.id!=socket.member_id);
            members.map(user=>{
                delete user.password;
            })
            Emit(socket,'members',members)
        })
    });

    socket.on('groups', data=> {
        // console.log(socket,'imhere');
        db.GroupMember.findAll({
            where:{UserId: socket.member_id}
        }).then(groupMember=>{
            groupMember = toJson(groupMember);
            if(groupMember.length>0){
                var groupIds = [];
                groupMember.map(gm=>{
                    groupIds.push(gm.GroupId);
                })
                db.Group.findAll({
                    where: {
                      id: groupIds // Same as using `id: { [Op.in]: [1,2,3] }`
                    }
                }).then(groups=>{
                    groups = toJson(groups);
                    Emit(socket,'groups',groups);
                })
                
            }else{
                Emit(socket,'groupMember',[])
            }
            // console.log('here: ',groupMember);
            // Emit(socket,'groupMember',groupMember)
        })
    });

    socket.on('newMessage', data=> {
        if(data.senderId && data.receiverId){
            db.Conversation.create(data).then(message=>{
                message = toJson(message);
                
                EmitTo(data.receiverId,'newMessage',message)
            })
        }else{
            Emit(socket,'newMessage',{success: false,msg: 'could not send your message!'})
        }
        
    });
    socket.on('brodcastMessage', data=> {
        if(data.message){
            
            db.User.findAll().then(users=>{
                users = toJson(users);
                messages = [];
                users.map(user=>{
                    // if(user.id!=socket.member_id){
                        messages.push({senderId: socket.member_id, receiverId: user.id,message: data.message});
                    // }
                })
                db.Conversation.bulkCreate(messages).then(()=>{
                    EmitTo(socket.member_id,'brodcastMessage',{success: true})
                    messages.map(message=>{
                        message['createdAt'] = new Date();
                        message['username'] = socket.member_name;
                        console.log('sending to ', message.receiverId)
                        console.log(message);
                        EmitTo(message.receiverId,'newMessage',message);
                        // EmitTo(message.senderId,'newMessage',message);
                    })
                })
            })
            
        }else{
            Emit(socket,'brodcastMessage',{success: false,msg: 'could not send your message!'})
        }
        
    });

    socket.on('newGroupMessage', data=> {
        if(data && data.GroupId && data.message){
            var newMessage = {
                ...data,
                UserId: socket.member_id
            }
            db.GroupConversation.create(newMessage).then(message=>{
                message = toJson(message);
                message['username'] = socket.member_name;
                // get all the group members and send them message
                db.GroupMember.findAll({
                    where: {GroupId: message.GroupId}
                }).then(groupMembers=>{
                    groupMembers = toJson(groupMembers);
                    groupMembers.map(gm=>{
                        // if(gm.UserId!=socket.member_id)
                            EmitTo(gm.UserId,'newGroupMessage',message);
                    })
                })
            })
        }else{
            Emit(socket,'newGroupMessage',{success: false,msg: 'could not send your message!'})
        }
        
    });

    socket.on('groupChatHistory', data=> {
        if(data.groupId){
            db.sequelize.query(`SELECT groupconversation.message, groupconversation.id, groupconversation.createdAt, groupconversation.UserId, groupconversation.GroupId,
                users.username, groups.name from groupconversation INNER JOIN users ON groupconversation.UserId=users.id
                INNER JOIN groups ON groupconversation.GroupId=groups.id WHERE groupconversation.GroupId=${data.groupId}`,{raw: true, type: db.Sequelize.QueryTypes.SELECT})
                .then(history=>{         
                    history = toJson(history);
                    // console.log(history);
                    Emit(socket,'groupChatHistory',history)
                    
            })
        }
        
    });

    socket.on('newGroup', data=> {
        if( data && data.name && data.groupMembers.length>0){
            db.Group.create({name: data.name,UserId: socket.member_id}).then(group=>{
                group = toJson(group);
                var groupMembers = [{UserId: socket.member_id,GroupId: group.id}];
                data.groupMembers.map(gm=>{
                    groupMembers.push({GroupId: group.id, UserId: gm});
                })
                db.GroupMember.bulkCreate(groupMembers).then(()=>{
                    Emit(socket,'newGroup',{success: true})
                })
            })
        }else{
            Emit(socket,'newGroup',{success: false,msg: 'could not create group!'})
        }
        
    });

    socket.on('chatHistory', data=> {
        var {receiverId} = data;
        
        var senderId = socket.member_id;
        db.sequelize.query(`SELECT * FROM conversations
        WHERE (senderId='${senderId}' AND receiverId='${receiverId}') OR
        (senderId='${receiverId}' AND receiverId='${senderId}')`,{raw: true, type: db.Sequelize.QueryTypes.SELECT})
        .then(history=>{         
            history = toJson(history);
            // console.log(history);
            Emit(socket,'chatHistory',history)
            
        })
        // db.Conversation.findAll({
        //     where: {
        //         [db.Sequelize.Op.or]: [
        //           {[db.Sequelize.Op.and] : [
        //             {senderId},
        //             {receiverId}
        //           ]},
        //           {[db.Sequelize.Op.and] : [
        //             {receiverId},
        //             {senderId}
        //           ]}
        //         ]
        //       },
        //       order: [
        //         ['createdAt', 'ASC']
        //     ],
        // }).then(history=>{
        //     history = toJson(history);
        //     console.log(history);
        //     Emit(socket,'chatHistory',history)
        // })
    });
};

function toJson(data){
    var jsonData = JSON.parse(JSON.stringify(data));
    return jsonData;
}