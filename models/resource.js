module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    key: DataTypes.STRING,
  }, {});

  Resource.associate = (models) => {
    models.Resource.belongsTo(models.User);
    models.Resource.belongsTo(models.Course);
    models.Resource.belongsToMany(models.Tag, { through: 'resource_tags' });
  };

  return Resource;
};
