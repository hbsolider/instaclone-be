import catchAsync from 'utils/catchAsync';
import userService from 'service/user.service';
import tokenService from 'service/token.service';
const userController = {};

userController.register = catchAsync(async (req, res) => {
  const user = await userService.register(req.body);
  const token = await tokenService.generateAuthTokens(user);
  res.json({
    user: user.transform(),
    token: token,
  });
});

userController.login = catchAsync(async (req, res) => {
  const user = await userService.login(req.body);
  const token = await tokenService.generateAuthTokens(user);
  res.json({
    user: user.transform(),
    token: token,
  });
});

userController.profile = catchAsync(async (req, res, next) => {
  const params = req.params;
  if (!!params.id) {
    const result = await userService.profileByUsername(params.id, req.user.id);
    return res.send(result);
  }
  const result = await userService.profile(req.user?.id);
  res.send(result);
});

userController.addComment = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { comment, photoId } = req.body;
  const Comment = await userService.comment({ userId: id, comment, photoId });
  res.send(Comment);
});

userController.follow = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { userId } = req.body;
  const result = await userService.follow({ follower: id, following: userId });
  res.send(result);
});
export default userController;
