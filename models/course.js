module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
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

  Course.associate = (models) => {
    models.Course.hasMany(models.Resource);
    models.Course.belongsToMany(models.Question, { through: 'course_questions' });
    models.Course.belongsToMany(models.User, { through: 'user_courses' });
  };

  return Course;
};
