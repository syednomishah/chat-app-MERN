'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {

    //from sequelize automatecally userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
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
    tableName: 'groupMembers'
  });
  GroupMember.associate = function(models) {
    const { User,Group } = models;

    GroupMember.belongsTo(User);
    User.hasMany(GroupMember);

    GroupMember.belongsTo(Group);
    Group.hasMany(GroupMember);
    
  };
  return GroupMember;
};