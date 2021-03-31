import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';

export const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  if (res.locals) {
    res.locals.errorMessage = err.message;
  }

  const response = {
    statusCode: statusCode ?? httpStatus.INTERNAL_SERVER_ERROR,
    message: message ?? httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
  };

  return res(response?.statusCode || 400).json(response);
};

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message);
  }

  return errorHandler(error, req, res);
};

export const notFoundHandler = (req, res, next) => {
  return res.json({
    message: 'Not found',
    statusCode: 404,
  });
};
