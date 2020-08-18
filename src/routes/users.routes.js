import Router from 'express';

import UserController from '../controllers/User/UserController';

const userRouter = Router();

const user = new UserController();

userRouter.get('/', user.index);
userRouter.get('/:username', user.show);
userRouter.post('/', user.store);

export default userRouter;