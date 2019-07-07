const db = require('../models');

const STUDENT_ROLE_ID = 2;

// Filter all enrollments based on student role, if any non-student role found assume admin
const isAdmin = enrollments => enrollments.filter(enrollment => enrollment.courseRoleId !== STUDENT_ROLE_ID).length !== 0;

const formatUser = async (req, res, next) => {
  const { userAccount: account, enrollments } = req.user;
  req.user = {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    githubUsername: account.githubUserName,
    isAdmin: isAdmin(enrollments),
    authToken: account.authToken,
    courses: enrollments.map(({ course }) => ({
      id: course.id,
      cohortId: course.cohortId,
      startDate: course.startDate,
      endDate: course.endDate,
      programName: course.cohort.program.name,
      programType: course.cohort.program.programType.name,
      universityName: course.cohort.program.university.name,
      universityLogo: course.cohort.program.university.logoUrl,
      maxAbsences: course.graduationRequirements.maxAbsence,
      maxRemotes: course.graduationRequirements.maxRemoteAttendance,
      maxMissedGeneral: course.graduationRequirements.maxMissedGeneralAssignment,
      maxMissedRequired: course.graduationRequirements.maxMissedRequiredAssignment,
    })),
  };

  res.json(req.user);

  next();
};

// UPSERT user into local DB (ensures updated authToken)
const updateUser = async (req, res, next) => {
  // upsert user

  try {
    // Upsert user object, bool returned
    await db.User.upsert(req.user);

    // Fetch User instance of the recently upserted user, attach to request
    req.User = await db.User.findOne({ where: { id: req.user.id } });
  } catch (error) {
    throw new Error(error);
  }

  next();
};

// Compare user courses against the local DB
const compareCourses = async (req, res, next) => {
  try {
    // fetch the dynamic table
    const UserCourse = db.sequelize.model('user_courses');

    // Check the associate count of courses for user
    req.foundCourses = await UserCourse.findAll({
      where: {
        user_id: req.user.id,
      },
    });

    // compare DB record count against courses.length
    // if the counts don't match, then records need updated
    if (req.user.courses.length !== req.foundCourses.length) {
      next();
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Find/Create all courses for user
const updateCourses = async (req, res, next) => {
  try {
    const courseQueries = req.user.courses.map(c => db.Course.findOrCreate({ where: { id: c.id }, defaults: c }));
    req.Courses = await Promise.all(courseQueries);
    next();
  } catch (error) {
    throw new Error(error);
  }
};

// Helper method to map to an objects id
const toId = course => course.id;

// Intersect the course records against the
const associateCourses = async (req) => {
  let unmappedCourseIds;

  if (req.foundCourses) {
    // Determine which courses are mapped in through table
    const mappedCourseIds = req.foundCourses.map(toId);
    unmappedCourseIds = req.user.courses.filter(e => !mappedCourseIds.includes(e.id)).map(toId);
  } else {
    unmappedCourseIds = req.user.courses.map(toId);
  }

  try {
    await req.User.addCourses(unmappedCourseIds);
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = [formatUser, updateUser, compareCourses, updateCourses, associateCourses];
