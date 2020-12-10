'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupConversation = sequelize.define('GroupConversation', {

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
    tableName: 'groupConversation'
  });
  GroupConversation.associate = function(models) {
    const { User,Group } = models;
    GroupConversation.belongsTo(Group);
    Group.hasMany(GroupConversation);

    GroupConversation.belongsTo(User);
    User.hasMany(GroupConversation);
    
  };
  return GroupConversation;
};