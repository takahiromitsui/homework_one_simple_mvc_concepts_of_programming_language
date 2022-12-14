import { Router } from 'express';
import { getDefault, getUser, postUser } from '../controllers/user';
import { User } from '../models/user';

const router = Router();
const users: User[] = [];

router.get('/', getDefault());

router.post(
	'/user',
	postUser({
		users: users,
		userID: new Date().toISOString(),
	})
);

router.get('/user/:id', getUser({ users: users }));

export default router;
