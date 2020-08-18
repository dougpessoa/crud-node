import Router from 'express';

import VerifiedController from '../controllers/User/VerifiedController';

const verifiedRouter = Router();

const verified = new VerifiedController();

verifiedRouter.patch('/', verified.update);

export default verifiedRouter;