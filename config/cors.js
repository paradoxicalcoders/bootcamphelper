const WHITE_LIST = [
  'http://localhost:3001',
  'http://localhost:3001/',
  'http://kubootcamphelper.herokuapp.com',
  'https://kubootcamphelper.herokuapp.com',
];

exports.corsOptions = {
  origin: (origin, callback) => {
    console.log('Origin: ', origin); // eslint-disable-line no-console
    if (WHITE_LIST.includes(origin) || !origin) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
};
