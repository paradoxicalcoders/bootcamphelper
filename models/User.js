module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    githubUsername: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    authToken: DataTypes.STRING,
  }, {});

  // User.associate = (models) => {
  //   // associations can be defined here
  // };

  return User;
};
