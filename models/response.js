module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    answer: DataTypes.STRING,
  }, {});

  Response.associate = (models) => {
    models.Response.belongsTo(models.Question);
    models.Response.belongsTo(models.User);
  };

  return Response;
};
