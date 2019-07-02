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
    enrollments: enrollments.map(e => ({
      id: e.id,
      courseId: e.course.id,
      cohortId: e.course.cohortId,
      startDate: e.course.startDate,
      endDate: e.course.endDate,
      programName: e.course.cohort.program.name,
      programType: e.course.cohort.program.programType.name,
      universityName: e.course.cohort.program.university.name,
      universityLogo: e.course.cohort.program.university.logoUrl,
      maxAbsences: e.course.graduationRequirements.maxAbsence,
      maxRemotes: e.course.graduationRequirements.maxRemoteAttendance,
      maxMissedGeneral: e.course.graduationRequirements.maxMissedGeneralAssignment,
      maxMissedRequired: e.course.graduationRequirements.maxMissedRequiredAssignment,
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
        // FIXME: Shouldn't need this second WHERE clause
        // enrollment_id: {
        //   [db.Sequelize.Op.in]: req.user.enrollments.map(e => e.id),
        // },
      },
    });

    // compare DB record count against enrollments.length
    // if the counts don't match, then records need updated
    if (req.user.enrollments.length !== req.foundEnrollments.length) {
      next();
    }
  } catch (error) {
    throw new Error(error);
  }
};

// Find/Create all enrollments for user
const updateEnrollments = async (req, res, next) => {
  try {
    const enrollmentQueries = req.user.enrollments.map(e => db.Enrollment.findOrCreate({ where: { id: e.id }, defaults: e }));
    req.Enrollments = await Promise.all(enrollmentQueries);
    next();
  } catch (error) {
    throw new Error(error);
  }
};

// Helper method to map to an objects id
const toId = enrollment => enrollment.id;

// Intersect the enrollment records against the
const associateEnrollments = async (req) => {
  let unmappedEnrollmentIds;

  if (req.foundEnrollments) {
    // Determine which enrollments are mapped in through table
    const mappedEnrollmentIds = req.foundEnrollments.map(toId);
    unmappedEnrollmentIds = req.user.enrollments.filter(e => !mappedEnrollmentIds.includes(e.id)).map(toId);
  } else {
    unmappedEnrollmentIds = req.user.enrollments.map(toId);
  }

  try {
    await req.User.addEnrollments(unmappedEnrollmentIds);
  } catch (error) {
    throw new Error(error);
  }
};

exports.login = [formatUser, updateUser, compareEnrollments, updateEnrollments, associateEnrollments];
