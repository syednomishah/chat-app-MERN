'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    
	username: {
	  type: DataTypes.TEXT,
      notEmpty: true,
      allowNull:false
  },
  password: {
      type: DataTypes.TEXT,
      notEmpty: true,
      allowNull:false
  }

  }, {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,

    // define the table's name
    tableName: 'users'
  });
  User.associate = function(models) {
    // associations can be defined here
    // const { User } = models;
   
    // User.belongsTo(User);
    // User.hasMany(User);
  };
  return User;
};