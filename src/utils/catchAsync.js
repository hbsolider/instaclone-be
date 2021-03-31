import httpStatus from 'http-status';
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const { statusCode, message } = err;
    res.locals.errorMessage = err.message;
    if (statusCode === 404) {
      return res.send('Not found');
    }
    const response = {
      statusCode: statusCode ?? httpStatus.INTERNAL_SERVER_ERROR,
      message: message ?? httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
    };
    return res.status(response.statusCode).json(response);
  });
};

export default catchAsync;
