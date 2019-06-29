module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    courseId: DataTypes.INTEGER,
    cohortId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  }, {});

  Enrollment.associate = (models) => {
    models.Enrollment.belongsToMany(models.Question, { through: 'enrollment_questions' });
    models.Enrollment.belongsToMany(models.User, { through: 'user_enrollments' });
  };

  return Enrollment;
};
