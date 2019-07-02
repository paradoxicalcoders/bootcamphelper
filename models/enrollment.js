module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    courseId: DataTypes.INTEGER,
    cohortId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    programName: DataTypes.STRING,
    programType: DataTypes.STRING,
    universityName: DataTypes.STRING,
    universityLogo: DataTypes.STRING,
    maxAbsences: DataTypes.INTEGER,
    maxRemotes: DataTypes.INTEGER,
    maxMissedGeneral: DataTypes.INTEGER,
    maxMissedRequired: DataTypes.INTEGER,
  }, {});

  Enrollment.associate = (models) => {
    models.Enrollment.belongsToMany(models.Question, { through: 'enrollment_questions' });
    models.Enrollment.belongsToMany(models.User, { through: 'user_enrollments' });
  };

  return Enrollment;
};
