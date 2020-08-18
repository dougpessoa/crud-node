import Router from 'express';

import CurriculumController from '../controllers/User/CurriculumController';

const curriculumRouter = Router();

const curriculum = new CurriculumController();

curriculumRouter.post('/', curriculum.store);

curriculumRouter.get('/user/:username', curriculum.show);

export default curriculumRouter;