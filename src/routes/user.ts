import { Router } from 'express';
import { getDefault, getUser, postUser } from '../controllers/user';

const router = Router();

router.get('/', getDefault);

router.post('/user', postUser);

router.get('/user/:id', getUser);

export default router;
