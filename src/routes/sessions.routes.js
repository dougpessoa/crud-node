import Router from 'express';

import SessionsController from '../controllers/User/SessionsController';

const sessionsRouter = Router();

const session = new SessionsController();

sessionsRouter.post('/', session.authentication);

export default sessionsRouter;