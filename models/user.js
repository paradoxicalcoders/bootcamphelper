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

  User.associate = (models) => {
    models.User.hasMany(models.Response);
    models.User.belongsToMany(models.Enrollment, { through: 'user_enrollments' });
  };

  return User;
};
