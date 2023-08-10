const allowedCors = ['http://mesto-ray.students.nomoreparties.co', 'https://mesto-ray.students.nomoreparties.co', 'http://localhost:3000', 'https://localhost:3000'];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsMW = (req, res, next) => {
  const { origin } = req.headers;
  console.log('Pfghjc c fronta');
  console.log(origin);
  const { method } = req;
  console.log(method);
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    console.log(res);
    console.log(res.header);
    res.end();
  }
  next();
};

module.exports = corsMW;
