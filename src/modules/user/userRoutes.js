import { Router } from 'express';

import userRegister from './controllers/userControllerRegister';
import userLogin from './controllers/userControllerLogin';

const router = Router();

router.post('/', userRegister);

router.post('/login', userLogin);

export default router;
