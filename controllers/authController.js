const db = require('../models');

const STUDENT_ROLE_ID = 2;

// Filter all enrollments based on student role, if any non-student role found assume admin
const isAdmin = enrollments => enrollments.filter(enrollment => enrollment.courseRole.id !== STUDENT_ROLE_ID).length !== 0;

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
    Enrollments: enrollments.map(e => ({
      id: e.id,
      courseId: e.course.id,
      cohortId: e.course.cohortId,
      startDate: e.course.startDate,
      endDate: e.course.endDate,
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

// Compare user enrollments against the local DB
const compareEnrollments = async (req, res, next) => {
  try {
    // fetch the dynamic table
    const UserEnrollment = db.sequelize.model('user_enrollments');

    // Check the associate count of enrollments for user
    req.foundEnrollments = await UserEnrollment.findAll({
      where: {
        user_id: req.user.id,
        enrollment_id: {
          [db.Sequelize.Op.in]: req.user.Enrollments.map(e => e.id),
        },
      },
    });

    // compare DB record count against enrollments.length
    // if the counts don't match, then records need updated
    if (req.user.Enrollments.length !== req.foundEnrollments.length) {
      next();
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Find/Create all enrollments for user
const updateEnrollments = async (req, res, next) => {
  try {
    const enrollmentQueries = req.user.Enrollments.map(e => db.Enrollment.findOrCreate({ where: { id: e.id }, defaults: e }));
    req.Enrollments = await Promise.all(enrollmentQueries);
    next();
  } catch (error) {
    throw new Error(error);
  }
};

// Intersect the enrollment records against the
const associateEnrollments = async (req) => {
  const mappedEnrollmentIds = req.Enrollments.map(e => e[0]);

  // Determine which enrollments are mapped in through table
  const unmappedEnrollmentIds = req.user.Enrollments.filter(e => !mappedEnrollmentIds.includes(e.id)).map(e => e.id);

  try {
    await req.User.addEnrollments(unmappedEnrollmentIds);
  } catch (error) {
    throw new Error(error);
  }
};


exports.login = [formatUser, updateUser, compareEnrollments, updateEnrollments, associateEnrollments];
