import { User, Photo, Comment, Like, Follow } from 'models';
import { Op } from 'sequelize';
import ApiError from 'utils/ApiError';
import http from 'http-status';
import { Sequelize } from 'sequelize';

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
    throw new ApiError(http.BAD_REQUEST, `Password doesn't not match!`);
  }
  throw new ApiError(http.BAD_REQUEST, 'Account is not exist!');
};

userService.profile = async (id) => {
  const followings = await Follow.findAndCountAll({
    where: {
      follower: id,
    },
  }).then((item) => ({
    followingCount: item.count,
  }));
  const follower = await Follow.findAndCountAll({
    where: {
      following: id,
    },
  }).then((item) => ({
    followerCount: item.count,
  }));

  const user = await User.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Photo,
        as: 'photos',
        include: [
          {
            model: Comment,
            as: 'comments',
            attributes: ['userId', 'comment'],
          },
          {
            model: Like,
            as: 'likes',
            attributes: ['userId'],
          },
        ],
        order: [[Photo, 'updatedAt', 'DESC']],
      },
    ],
  }).then((user) => user.dataValues);
  return { ...followings, ...follower, ...user };
};

userService.profileByUsername = async (username, mineId) => {
  const isUser = await User.findOne({
    where: {
      username,
    },
  });
  if (isUser === null) {
    throw new ApiError(406, 'Username is not exist');
  }
  const id = isUser.id;
  const isfollow = await Follow.findOne({
    where: {
      follower: mineId,
      following: id,
    },
  });
  const followings = await Follow.findAndCountAll({
    where: {
      follower: id,
    },
  }).then((item) => ({
    followingCount: item.count,
  }));
  const follower = await Follow.findAndCountAll({
    where: {
      following: id,
    },
  }).then((item) => ({
    followerCount: item.count,
  }));
  const user = await User.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Photo,
        as: 'photos',
        include: [
          {
            model: Comment,
            as: 'comments',
            attributes: ['userId', 'comment'],
          },
          {
            model: Like,
            as: 'likes',
            attributes: ['userId'],
          },
        ],
        order: [[Photo, 'updatedAt', 'DESC']],
      },
    ],
  }).then((user) => user.dataValues);
  return { ...followings, ...follower, ...user, isfollow: !!isfollow };
};

userService.comment = async ({ userId, comment, photoId }) => {
  return await Comment.create({
    userId,
    photoId,
    comment,
  });
};

userService.follow = async ({ follower, following }) => {
  const isfl = await Follow.findOne({
    follower,
    following,
  });
  if (!isfl) {
    return await Follow.create({
      follower,
      following,
    });
  } else {
    return await isfl.destroy();
  }
};

userService.updateProfileById = async ({ id, ...res }) => {
  return await User.update(res, {
    where: {
      id,
    },
  });
};
export default userService;
