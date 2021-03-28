import jwt from 'jsonwebtoken';
import { jwt as jwtKey } from 'config/vars';
import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';

export const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  jwt.verify(token, jwtKey.secret, (err, user) => {
    if (err) throw new ApiError(httpStatus.FORBIDDEN, 'Forbiden');
    req.user = user;
    next();
  });
};
