const db = require('../models');

const STUDENT_ROLE_ID = 2;

// Filter all enrollments based on student role, if any non-student role found assume admin
const isAdmin = user => user.enrollments.filter(enrollment => enrollment.courseRole.id !== STUDENT_ROLE_ID).length !== 0;

const fetchUser = async (req, res, next) => {
  const { userAccount: account, enrollments } = req.user;
  const user = {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    githubUsername: account.githubUserName,
    isAdmin: isAdmin(req.user),
    authToken: account.authToken,
    enrollments: enrollments.map(enrollment => ({
      id: enrollment.id,
      courseId: enrollment.course.id,
      cohortId: enrollment.course.cohortId,
      startDate: enrollment.course.startDate,
      endDate: enrollment.course.endDate,
    })),
  };

  try {
    await db.User.create(user, {
      include: [db.Enrollment],
    });

    const rs = await db.User.findOne({
      where: { id: req.user.userAccount.id },
      include: [db.Enrollment],
    });

    console.log(JSON.stringify(rs, null, 2));

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPSERT user into local DB (ensures updated authToken)
const updateUser = async (req, res, next) => {
  // upsert user
  const { userAccount: account } = req.user;
  const user = {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    githubUsername: account.githubUserName,
    isAdmin: account.isAdmin,
    authToken: account.authToken,
  };

  try {
    await db.User.upsert(user);
  } catch (error) {
    res.status(500).send(error);
  }

  next();
};

// Compare user enrollments against the local DB
const updateEnrollments = async (req, res) => {
  const enrollments = req.user.enrollments.map(enrollment => ({
    id: enrollment.id,
    courseId: enrollment.courseId,
    cohortId: enrollment.course.cohortId,
    startDate: enrollment.course.startDate,
    endDate: enrollment.course.endDate,
  }));

  try {
    // query DB for enrollment count
    const rs = await db.Enrollment.findAll({
      include: [{
        model: db.User,
        where: {
          id: req.user.userAccount.id,
        },
      }],
    });

    // compare DB record count against enrollments.length
    if (enrollments.length === rs.length) {
      // if matched return user object
      res.json(req.user);
    } else {
      // else upsert enrollments into DB
      const enrollmentUpserts = enrollments.map(enrollment => db.Enrollment.upsert(enrollment));
      await Promise.all(enrollmentUpserts);
      res.json(req.user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.login = [fetchUser, updateUser, updateEnrollments];
