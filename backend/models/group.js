'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {

    //from sequelize automatecally userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
	
	name: {
	  type: DataTypes.TEXT,
      notEmpty: true,
      allowNull:false
    }
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
    tableName: 'groups'
  });
  Group.associate = function(models) {
    const { User } = models;
    Group.belongsTo(User);
    User.hasMany(Group);
    
  };
  return Group;
};