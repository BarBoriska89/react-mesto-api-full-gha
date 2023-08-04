const allowedCors = ['http://mesto-ray.students.nomoreparties.co', 'https://mesto-ray.students.nomoreparties.co', 'localhost:3000'];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsMW = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  console.log(`origin=${origin}`);
  console.log(method);
  console.log(requestHeaders);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Aow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};

module.exports = corsMW;
