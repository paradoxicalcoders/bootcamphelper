module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
  }, {});

  Tag.associate = (models) => {
    models.Tag.belongsToMany(models.Resource, { through: 'resource_tags' });
    // models.Tag.belongsToMany(models.User, { through: 'user_Tags' });
  };

  return Tag;
};
