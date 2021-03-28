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

export default userController;
