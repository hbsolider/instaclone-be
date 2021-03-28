import { User } from 'models';
import { Op } from 'sequelize';
import ApiError from 'utils/ApiError';
import http from 'http-status';

const userService = {};

userService.register = async ({ username, password, fullname, email }) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    },
  });
  if (user) {
    if (user.compareEmail(email)) {
      throw new ApiError(http.CONFLICT, 'Email is exist');
    } else {
      throw new ApiError(http.CONFLICT, 'Username is exist');
    }
  }
  return await User.create({
    username,
    password,
    fullname,
    email,
  });
};

userService.login = async (field) => {
  let where = {};
  if (field.username) {
    where = {
      username: field.username,
    };
  } else {
    where = {
      email: field.email,
    };
  }
  const user = await User.findOne({
    where: {
      ...where,
    },
  });
  if (user) {
    const isPasswordMatch = user.isPasswordMatch(field.password);
    if (isPasswordMatch) {
      return user;
    }
    throw new ApiError(
      http.NON_AUTHORITATIVE_INFORMATION,
      `Password doesn't not match!`
    );
  }
  throw new ApiError(
    http.NON_AUTHORITATIVE_INFORMATION,
    'Account is not exist!'
  );
};

export default userService;
