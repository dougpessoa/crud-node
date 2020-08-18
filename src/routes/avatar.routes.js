import Router from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import AvatarController from '../controllers/User/AvatarController';

const upload = multer(uploadConfig);
const avatar = new AvatarController();

const avatarRouter = Router();

avatarRouter.patch('/', upload.single('avatar'), avatar.update);
avatarRouter.delete('/', avatar.delete);

export default avatarRouter;