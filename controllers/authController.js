const db = require('../models');

// Inspect user to see if they should be considered an admin
const updateIsAdmin = async (req, _res, next) => {
  const STUDENT_ROLE_ID = 2;
  // Filter all enrollments based on student role, if any non-student role found assume admin
  const isAdmin = req.user.enrollments.filter(enrollment => enrollment.courseRole.id !== STUDENT_ROLE_ID).length !== 0;

  req.user.userAccount.isAdmin = isAdmin;
  next();
};

// UPSERT user into local DB (ensures updated authToken)
const updateUser = async (req, _res, next) => {
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

  req.user.userAccount = await db.User.upsert(user, { returning: true });

  next();
};

// Compare user enrollments against the local DB
const updateEnrollments = async (req, res) => {
  const { enrollments } = req.user;
  // query DB for enrollment count
  // compare DB record count against enrollments.length
  // if matched return user object
  console.log('Enrollment Count', enrollments.length);
  // else upsert enrollments into DB

  res.json(req.user);
};


exports.login = [updateIsAdmin, updateUser, updateEnrollments];
