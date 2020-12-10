'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {

    //from sequelize automatecally userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
	
	message: {
	  type: DataTypes.TEXT,
      notEmpty: true,
      allowNull:false
    },
	type:{
		type:DataTypes.TEXT,
        allowNull:true,
        defaultValue: "txt"
	},
	isRead:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0
	},
	// sender_id: {
  //     type: DataTypes.INTEGER,
  //     allowNull: true,
  //   },
	// receiver_id: {
  //     type: DataTypes.INTEGER,
  //     allowNull: true,
  //   },
	
    
//location as city_id
  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,

    // define the table's name
    tableName: 'conversations'
  });
  Conversation.associate = function(models) {
    const { User } = models;
    Conversation.belongsTo(User, {foreignKey: "senderId", as: "Sender"});
    User.hasMany(Conversation, {foreignKey: "senderId", as: "Sender"});
    
    Conversation.belongsTo(User, {foreignKey: "receiverId", as: "Receiver"});
    User.hasMany(Conversation, {foreignKey: 'receiverId', as: "Receiver"});
  };
  return Conversation;
};