import jwt from 'jsonwebtoken';
import { jwt as jwtKey } from 'config/vars';
import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { User } from 'models';
import catchAsync from 'utils/catchAsync';
export const auth = catchAsync(async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null || typeof token === 'undefined' || token === '') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
  jwt.verify(token, jwtKey.secret, async (err, user) => {
    if (err) next(err);
    const userVerify = await User.findByPk(user?.sub);
    req.user = userVerify;
    next();
  });
});
