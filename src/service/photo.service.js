import httpStatus from 'http-status';
import { Photo, Like, Comment, User } from 'models';
import ApiError from 'utils/ApiError';
import { Sequelize } from 'sequelize';

const photoService = {};

/*
caption
image
userId
*/

photoService.create = async (field) => {
  return Photo.create({
    ...field,
  });
};

photoService.delete = async ({ id, userId }) => {
  const photo = await Photo.findOne({
    where: {
      id,
    },
  });
  if (photo) {
    if (photo.isOwner(userId)) {
      return await photo.destroy();
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, `You aren't the owner!`);
  }
  throw new ApiError(httpStatus[400], `Photo is not exist!`);
};

photoService.editCaption = async ({ id, caption }) => {
  const photo = await Photo.findOne({
    where: {
      id,
    },
  });
  if (photo) {
    if (photo.isOwner(userId)) {
      return await photo.update({ caption });
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, `You aren't the owner!`);
  }
  throw new ApiError(httpStatus[400], `Photo is not exist!`);
};

photoService.getAllByUserId = async ({ userId }) => {
  return await Photo.findAndCountAll({
    where: {
      userId,
    },
  });
};

photoService.getNewFeed = async ({ offset = 0 }) => {
  const page = {
    limit: 5,
    offset: offset * 5,
  };
  return await Photo.findAndCountAll({
    ...page,
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Like,
        as: 'likes',
        attributes: ['userId', 'photoId', 'updatedAt'],
      },
      {
        model: User,
        as: 'owner',
      },
      {
        model: Comment,
        as: 'comments',
      },
    ],
  });
};

photoService.getOneById = async (id) => {
  return await Photo.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
        as: 'owner',
      },
      {
        model: Comment,
        as: 'comments',
        include: [
          {
            model: User,
            as: 'userComment',
          },
        ],
      },
    ],
  });
};

export default photoService;
