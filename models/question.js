
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: DataTypes.STRING,
  }, {});

  Question.associate = (models) => {
    // associations can be defined here
    models.Question.hasMany(models.Response);
    models.Question.belongsToMany(models.Course, { through: 'course_questions' });
  };

  return Question;
};
