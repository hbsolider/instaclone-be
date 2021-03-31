import catchAsync from 'utils/catchAsync';
import photoService from 'service/photo.service';
const photoController = {};

photoController.getNewFeed = catchAsync(async (req, res) => {
  const { offset } = req.query;
  const newFeeds = await photoService.getNewFeed(offset || 0);
  res.send(newFeeds);
});

photoController.getOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next();
  const image = await photoService.getOneById(id);
  res.send(image);
});
export default photoController;
