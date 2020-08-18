import Router from 'express';

import userRouter from './users.routes';
import curriculumRouter from './curriculum.routes';
import sessionsRouter from './sessions.routes';
import avatarRouter from './avatar.routes';
import verifiedRouter from './verified.routes';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import routeNotFound from '../middlewares/routeNotFound';
import gettingErrorAplication from '../middlewares/gettingErrorAplication';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/verified', verifiedRouter);

routes.use(ensureAuthenticated);

routes.use('/avatar', avatarRouter);
routes.use('/curriculum', curriculumRouter);

routes.use(routeNotFound);
routes.use(gettingErrorAplication);

export default routes;