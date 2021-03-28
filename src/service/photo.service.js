import httpStatus from 'http-status';
import { Photo } from 'models';
import ApiError from 'utils/ApiError';

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
export default photoService;
